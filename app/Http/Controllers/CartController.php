<?php

namespace App\Http\Controllers;

use App\Product;
use App\Http\Requests\CartRequest;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return  view('cart');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CartRequest $request)
    {
// читать json файл
        $json['product'] =  Product::all()->toArray();

// телеграм
//$token = "912678656:AAEnxYeP4AdA5S5WiCaV6HGHMHeqqJWE6o4";

    //лид
        $token_lid = setting('site.telegram_token_lid');//"1149893380:AAEExu8M3w2SKpbJqbl18XRFIypnOtBb63Y";
        $chat_lid = setting('site.telegram_group_lid');//"-406683028"
    //товары
        $token = setting('site.telegram_token_products');//"912678656:AAEnxYeP4AdA5S5WiCaV6HGHMHeqqJWE6o4";
        $chat_id = setting('site.telegram_group_products');//"-269433522";
    //     change-battery
        $token2 = setting('site.telegram_token_battery');//"1022700894:AAFxq50L8Wp85a6qbUJFhKW7crrEvT1gMsI";
        $chat_id2 = setting('site.telegram_group_battery'); //"-357215928";
    //    trade
        $token3 = setting('site.telegram_token_trade');//"1063043411:AAEYq4KIZ4IUH8mcNGkxGrNTqxxyDxnsqbI";
        $chat_id3 = setting('site.telegram_group_trade');//"-381362834";
//письмо
        $data_input = json_decode($request->getContent(), 1);

        $message = '';
        if(isset($data_input['ephone'])) {
            $message .= '<h1>Заказ в магазине</h1>';
            $message .='<p>Телефон: '.$data_input['ephone'].'</p>';
            $message .='<p>Почта: '.$data_input['email'].'</p>';
            $message .='<p>Клиент: '.$data_input['ename'].'</p>';
            $message .='<p>Отделение Новой почты: '.$data_input['delivery'].'</p>';
        }
        if (in_array('cart', $data_input)){
            $cart = $data_input['cart'];

        }
        $sum = 0;
        if(isset($data_input['lid_name'])) {
            $botMes =array(
                'Телефон:' => $data_input['lid_phone'],
                'Имя:'  =>  $data_input['lid_name'],
            );
            $txt_lid ='';
            foreach($botMes as $key => $value) {

                $txt_lid .= "<b>".$key."</b> ".$value."%0A";
            }

            if($txt_lid){
                $sendToTelegram_lid = fopen("https://api.telegram.org/bot{$token_lid}/sendMessage?chat_id={$chat_lid}&parse_mode=html&text={$txt_lid}","r");
            }
            return 'sent';
        }
        if(isset($cart['trade'])) {
            $trade = $cart['trade'];
            foreach ($trade as $valTrade=>$trad) {
                $message .= $json['trade'][$valTrade]['name'].' '. $trad.' --- ';
                $message .= $json['trade'][$valTrade]['size'][$trad].' грн  --- ';
            }
        }
        if(isset($cart['change_battery'])) {
            $change_battery = $cart['change_battery'];
            foreach ($change_battery as $valChange=>$chan) {
                $message .= $json['change_battery'][$valChange]['name'].' '. $chan.' --- ';
                $message .= $json['change_battery'][$valChange]['price'].' грн  --- ';
            }
        }
        if(isset($cart['product'])) {
            foreach ($cart['product'] as $id=>$count) {
                $message .=$json['product'][$id]['name'].' --- ';
                $message .=$count.' --- ';
                $message .=$count*$json['product'][$id]['cost'];
                $message .='<br>';
                $sum = $sum +$count*$json['product'][$id]['cost'];
            }
            $message .='Всего: '.$sum;
            $message .='<br>';
        }
        if(isset($data_input['ephone'])){
            $botMes = array(
                'Телефон:' => $data_input['ephone'],
                'Почта:'  =>  $data_input['email'],
                'Клиент:'  => $data_input['ename'],
            );
            $data_input['present'] ? $botMes['Город:'] = $data_input['present'] : '';
            $data_input['selectedWayToPay'] ? $botMes['Способ оплаты:'] = $data_input['selectedWayToPay'] : '';
            $data_input['selectedDelivery'] ? $botMes['Доставка:'] = $data_input['selectedDelivery'] : '';
            $data_input['delivery'] ? $botMes['Отделение почты:'] = $data_input['delivery'] : '';
            $data_input['adress_delivery'] ? $botMes['Адресс доставки:'] = $data_input['adress_delivery'] : '';
            $code = $this->generateRandomString();
            $botMes['Код заказа:'] = $code;
            $carts = $data_input['cart'];
            $product = $cart['product'];
            $jsonProduct= $json['product'];
            $sums = 0;
            $counts = 0;
            foreach ($product as $productVal=>$prodCount) {
                $names = $jsonProduct[$productVal]['name'];
                $sums = $sums +$count * $jsonProduct[$productVal]['cost'];
                $botMes[strip_tags($names)] = ' Количество: '.$count.' Цена: '.$jsonProduct[$productVal]['cost'];
            }
            if(is_array($carts['trade']) || is_object($carts['trade'])) {
                foreach ($carts['trade'] as $tradeValue=>$tra) {
                    $sums += $json['trade'][$tradeValue]['size'][$tra];
                    $botMes['Обмен'] = 'телефона:';
                    $botMes[$json['trade'][$tradeValue]['name']] = ' '.$tra. ' '.$json['trade'][$tradeValue]['size'][$tra]. ' грн';
                }
            }
            if(is_array($carts['change_battery']) || is_object($carts['change_battery'])) {
                foreach ($carts['change_battery'] as $changeValue => $cha) {
                    $sums += $json['change_battery'][$changeValue]['price'];
                    $botMes['Замена'] = 'батареи:';
                    $botMes[$json['change_battery'][$changeValue]['name']] = ' ' . $cha . ' ' . $json['change_battery'][$changeValue]['price'] . ' грн';
                }
            }
            $botMes['Всего:'] = $sums . ' грн';
            $txt = '';
            foreach($botMes as $key => $value) {
                $txt .= "<b>".$key."</b> ".$value."%0A";
            }
            $result_url = "https://icider.com.ua/liqpay_result";
            $description = "Покупка товара в icider.com.ua";
            if($data_input['selectedWayToPay'] == "pay_online"){
                $this->sendLiqpayForm($code, $sums, $result_url, $description, $autosubmit = true);
            } else {
                if($txt){
                    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
                }
                return 'sent';
            }
        } else if(isset($data_input['phone']) && !$data_input['change']) {
            $botMes =array(
                'Телефон:' => $data_input['phone'],
                'Имя:'  =>  $data_input['name'],
                'Комментарий:' => $data_input['comment'],
                'Марка телефона:' => $data_input['phone_mark'],
                'Цена:' => $data_input['price'],
            );
            $txt2 = '';
            foreach($botMes as $key => $value) {
                $txt2 .= "<b>".$key."</b> ".$value."%0A";
            }
            if($txt2){
                $sendToTelegram2 = fopen("https://api.telegram.org/bot{$token2}/sendMessage?chat_id={$chat_id2}&parse_mode=html&text={$txt2}","r");
            }
            return 'sent';
        } else if(isset($data_input['change'])){
            $botMes3 = array(
                'Телефон: ' => $data_input['phone'],
                'Имя: '  =>  $data_input['name'],
                'Комментарий: ' => $data_input['comment'],
                'Марка телефона: ' => $data_input['phone_mark'],
                'Замена: ' => $data_input['change'] == 'glass' ? 'Скло' : 'Екран' ,
                'Цена: ' => $data_input['price'],
            );
            $txt3 = '';
            foreach($botMes3 as $k => $val) {
                $txt3 .= "<b>".$k."</b> ".$val."%0A";
            }
            if($txt3){
                $sendToTelegram3 = fopen("https://api.telegram.org/bot{$token3}/sendMessage?chat_id={$chat_id3}&parse_mode=html&text={$txt3}","r");
            }
            return 'sent';
        }

        $to = 'test@gmail.com'.','; //не забудь поменять!
        $to .=$data_input['email'];
        $spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";


        $data = [
            'text' => $message,
            'chat_id' => $chat_id
        ];

    }
    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    function sendLiqpayForm($order_id, $amount, $result_url, $description, $autosubmit = true)
    {
        $liqpay_public_key = setting('site.liq_pay_public_key');
        $liqpay_private_key = "MI18hY3itETmQcHDIbhaDwQ6vNPR6GZQhGsfiKOt";
        $liqpay = new \LiqPay($liqpay_public_key, $liqpay_private_key);
        $html = $liqpay->cnb_form(array(
            'result_url'     => $result_url,
            'server_url'     => $result_url,
//            'server_url'     => 'http://dateplanet.fr/user/callback-liqpay',
//тестовый режим
//           'sandbox'        => Yii::$app->params['liqpay_sandbox'],
            'action'         => 'pay',
            'amount'         => $amount,
            'currency'       => 'UAH',
            'description'    => $description,
            'order_id'       => "$order_id",
            'version'        => 3
        ), 'sendform', $autosubmit);

        echo $html;

    }
    function actionCallbackLiqpay($model)
    {

        $liqpay = new \LiqPay($this->liqpay_public_key, $this->liqpay_private_key);
        $res = $liqpay->api("request", array(
            'action'        => 'status',
            'version'       => '3',
            'order_id'      => $order['id']
        ));

        return $res;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function setContView($id){
        return 1;
    }

}
