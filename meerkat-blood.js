$(document).ready(meerkat_init);

var meerkatCnt;
var meerkats;

var successCnt = 0;
var plstCnt = 0;
var sh_speed = 700;
var sh_inerval = [3000, 1000];

var effects = {};
	effects.show = "easeOutElastic";
	effects.hide = "easeInOutElastic";

function meerkat_get_rand_show_speed()
{
	return parseInt(Math.random() * (sh_inerval[0] - sh_inerval[1]) + sh_inerval[1]);
}

function updateInfo()
{
	$("#bg").html(successCnt+"_"+plstCnt);
}

function meerkat_init()
{
	meerkats = document.getElementsByClassName("meerkat");
	meerkatCnt = meerkats.length;
	
	kennels = document.getElementsByClassName("kennel");
	kennelCnt = kennels.length;
	
	$(".meerkat").click(function() {
		meerkat_break(this);
	});
	
	meerkat_start();
}

function meerkat_click(mk)
{
	if(!$(mk).hasClass("in_hide"))
	{
		$(mk).find("img").attr("src", "resources/meerkat-hummer-1.svg");
		meerkat_hide_mk(mk, "user");
	}
}

function meerkat_kennel_have_mk(kn)
{
	return $(kn).find(".meerkat").size();
}

function meerkat_create_dom()
{
	meerkat = document.createElement("div");
	meerkat.className = "meerkat";
		meerkatImg = document.createElement("img");
		meerkatImg.src = "resources/meerkat-normal.svg";
		meerkat.appendChild(meerkatImg);
	
	$(meerkat).click(function() {
		meerkat_click(this);
	});
	
	return meerkat;
}

function meerkat_hide_mk(mk, hand)
{
	$(mk).addClass("in_hide");
	$(mk).animate({height: 0}, sh_speed, effects.hide);
	setTimeout(function() {
		if(hand == "auto" && mk.parentNode != null)
		{
			plstCnt++;
		}
		else if(hand == "user")
		{
			successCnt++;
		}
		$(mk).remove();
		updateInfo();
	}, sh_speed);
}

function meerkat_show_mk(mk)
{
	$(mk).animate({height: 212}, sh_speed, effects.show);
}

function meerkat_break_mk(mk, hand)
{
	setTimeout(function() {
		meerkat_hide_mk(mk, hand);
	}, 1000);
}

function meerkat_get_random_show()
{
	setTimeout(function() {
		randPos = parseInt(Math.random() * (kennelCnt - 0) + 0);
		
		new_mk = meerkat_create_dom();
		kn = kennels[randPos];
		
		if(!meerkat_kennel_have_mk(kn))
		{
			kennels[randPos].appendChild(new_mk);
			meerkat_show_mk(new_mk);
			meerkat_break_mk(new_mk, "auto");
		}
	}, meerkat_get_rand_show_speed());
}

function meerkat_start()
{
	meerkat_get_random_show();
	setInterval(meerkat_get_random_show, 1000);
}

