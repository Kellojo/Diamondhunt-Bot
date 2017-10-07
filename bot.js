var is_BottkusMaximusRunning = false;

var html = '<div><select id="bottikus_maximus_selectedBar"><option value="bronzeBar">Bronze</option><option value="goldBar">Gold</option><option value="ironBar">Iron</option><option value="silverBar">Silber</option><option value="glass">Glass</option><option value="goldBar">GoldBar</option></select><br/><input type="number" id="bottikus_maximus_ammount" placeholder="Ammount per iteration..."></input><br/><button onclick="is_BottkusMaximusRunning = true;">Start Bot</button><button onclick="is_BottkusMaximusRunning = false;">Stop Bot</button></div>';
$("#tab-sub-container-crafting").append(html);

setInterval(function() {
	if (is_BottkusMaximusRunning) {
		if (smeltingAmount == 0 && smeltingBarType == 0 && !$("#notif-smelting").is(":visible")) {
			openFurnaceDialogue('boundBronzeFurnace');

			//set selection
			selectedBar = $("#bottikus_maximus_selectedBar").val();
			$("#input-smelt-bars-amount").val($("#bottikus_maximus_ammount").val());

			//smelt!
			setTimeout(function(){
				$('#dialogue-furnace-mats-needed-area > input[type="button"]').click();
			}, 1000);
		}
	}
}, 4000);
