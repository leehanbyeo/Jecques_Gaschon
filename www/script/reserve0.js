$(document).ready(function(){

    // 기초 데이터
    var days = ["일","월","화","수","목","금","토"];
    var months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
    //var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var holi = [
        [1],        //새해
        [4,5,6],    //설날
        [1],        //3.1절
        [],
        [5,12],     //어린이날,부처님오신날
        [6],        //현충일
        [],
        [15],       //광복절
        [12,13,14], //추석
        [3,9],      //개천절,한글날
        [],
        [25]        //크리스마스
    ]

    // 셀 만들기
    $(".cal").append("<thead><tr class='cal-head'><td colspan='7' class='cal-title'><button class='cal-btn cal-prev'>&lsaquo;</button><span class='yyyy'></span> <span class='mm'></span><button class='cal-btn cal-next'>&rsaquo;</button></td></tr><tr class='cal-day'></tr></thead><tbody></tbody>");
    for(i=0; i<7; i++){
        $(".cal-day").append("<th>"+days[i]+"</th>");
    }
    for(i=0; i<6; i++){
        $(".cal").children("tbody").append("<tr class='cal-body'></tr>");
        for(j=0; j<7; j++){
            $(".cal-body:last-of-type").append("<td class='dcell'></td>");
        }
    }


    function makecal(dir){
        var newtime;
        // 현재 시간 측정하기
        if(dir == undefined)  {
            newtime = new Date();
        }else{
            var preyear = Number.parseInt($(".yyyy").text());
            var premonth = Number.parseInt($(".mm").text());
            newtime = new Date(preyear+","+(premonth)+",1");
            if(dir == 1){
                newtime.setDate(32);
                preyear = newtime.getFullYear();
                premonth = newtime.getMonth();
                newtime = new Date(preyear+","+(premonth+1)+",1");
            }else if(dir == -1){
                newtime.setDate(0);
                preyear = newtime.getFullYear();
                premonth = newtime.getMonth();
                newtime = new Date(preyear+","+(premonth+1)+",1");
            }else{
                alert("makecal 함수의 인수는 오로지 공백 또는 1 또는 -1 값만 사용합니다.");
            }
        }
        var year = newtime.getFullYear();
        var month = newtime.getMonth();
        var date = newtime.getDate();
        var day = newtime.getDay();
        var firstdate = new Date(year+','+(month+1)+',1');
        var firstday = firstdate.getDay(); // 이번달 첫날의 요일
        var lastdate1 = new Date(year+','+(month+1)+',1');
        lastdate1.setDate(32);
        lastdate1.setDate(0);
        var lastdate = lastdate1.getDate(); // 이번달의 마지막날(일(day)의 개수)

        $(".cal-title .yyyy").text(year+"년");
        $(".cal-title .mm").text(months[month]);
        $(".dcell").empty();
        $(".dcell").removeAttr("style");
        $(".dcell").html("&nbsp;");
        for(i=0; i<lastdate; i++){
            $(".dcell").eq(firstday+i).text(i+1);
            for(j=0; j<holi[month].length; j++){
                if(holi[month][j] == i+1){
                    $(".dcell").eq(firstday+i).css("color","red");
                }
            }
        }
    }

    var hot = false;
    var weekend = false;
    var today = new Date();
    var todayyear = today.getFullYear();
    var todaymonth = today.getMonth();
    var todaydate = today.getDate();
    var todayday = today.getDay();
    
    var start = new Date(todayyear,6,20);
    var end   = new Date(todayyear,7,11);
    if(today >= start && today <= end){
        hot = true;
    }else if(todaymonth==1 && (todaydate>=4 && todaydate<=6)){
        hot = true;
    }else if(todaymonth==8 && (todaydate>=12 && todaydate<=14)){
        hot = true;
    }
    
    if(todayday == 6 || todayday == 0){
        weekend = true;
    }
    
    // hot  weekend
    //  t           2
    //  t           2
    //  f    t      1
    //  f    f      0
    var p;
    if(hot){
        p = 2;
    }else if(weekend){
        p = 1;
    }else{
        p = 0;
    }
    
    
    var price = [
        [80000, 100000, 150000], // 소형방
        [100000, 120000, 200000], // 중형방
        [200000, 250000, 350000]  // 대형방
    ];
    
    $(".cal-prev").click(function(){ makecal(-1) });
    $(".cal-next").click(function(){ makecal(1) });

    makecal();


    $("input[type=checkbox]").click(function(){
        if($(this).prop("checked")){
            $(this).parent().next().children("select").prop("disabled",false);
        }else{
            $(this).parent().next().children("select").prop("disabled",true);
        }
    });

    
    $(".dabox, .opbox").change(function(){
        $(".reboxl").each(function(){
            var roomtype = $(this).children(".roomtype").val();
            roomtype = parseInt(roomtype);
            var dayprice = price[roomtype][p];
            var whatday = parseInt($(this).children(".dabox").val());
            
            var total = dayprice * whatday;
            
            $(this).children("p").html(total);
            
            var totaltotal = 0;
            for(i=0; i<$(".reboxl").length; i++){
                if($(this).prev().children("input").prop("checked")){
                    totaltotal += parseInt($(".reboxl").eq(i).children("p").text());
                }
            }
            $("#totaltotal").text(totaltotal);
        });
    });
    
    $("input[type=checkbox]").click(function(){
        var totaltotal = 0;
        for(i=0; i<$(".reboxl").length; i++){
            if($(".reboxl").eq(i).prev().children("input").prop("checked")){
                totaltotal += parseInt($(".reboxl").eq(i).children("p").text());
            }
        }
        $("#totaltotal").text(totaltotal);
        if(!$(this).prop("checked")){
            $(this).parent().next().children("select").children("option").eq(0).prop("selected",true);
            $(this).parent().next().children("p").text("0");
        }
    });
    
    
    $(".dcell").click(function(){
        var t1 = $(".yyyy").text();
        var t2 = $(".mm").text();
        $("#date").text(t1+t2+"..일");
    });

});







