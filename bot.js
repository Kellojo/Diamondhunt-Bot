var is_BottkusMaximusSmelting = false;
var is_BottkusMaximusFarming = false;
var is_BottkusMaximusDrinkingPotions = false;

var html = '<div><select id="bottikus_maximus_selectedBar"><option value="bronzeBar">Bronze</option><option value="goldBar">Gold</option><option value="ironBar">Iron</option><option value="silverBar">Silber</option><option value="glass">Glass</option></select><br/><input type="number" id="bottikus_maximus_ammount" placeholder="Ammount per iteration..."></input><br/><label><input type="checkbox" id="bottikus_maximus_isAutoSell">Auto sell selected items</label><br/><button onclick="is_BottkusMaximusSmelting = true;">Start Bot</button><button onclick="is_BottkusMaximusSmelting = false;">Stop Bot</button></div>';
$("#tab-sub-container-crafting").append(html);

var html = '<div><select id="bottikus_maximus_selectedSeed"><option value="redMushroomSeeds">Mushroom Seeds (red)</option><option value="blewitMushroomSeeds">Mushroom Seeds (blue - blewit)</option><option value="snapegrassSeeds">Snape Grass Seeds</option><option value="greenLeafSeeds">Green Leaf Seeds</option><option value="dottedGreenLeafSeeds">Dotted Green Leaf Seeds</option><option value="limeLeafSeeds">Lime Leaf Seeds</option><option value="goldLeafSeeds">Gold Leaf Seeds</option><option value="crystalLeafSeeds">Crystal Leaf Seeds</option><option value="stripedCrystalLeafSeeds">Striped Crystal Leaf Seeds</option><option value="treeSeeds">Tree Seeds</option><option value="oakTreeSeeds">Oak Tree Seeds</option><option value="willowTreeSeeds">WillowT ree Seeds</option><option value="mapleTreeSeeds">Maple Tree Seeds</option><option value="stardustTreeSeeds">Sardust Tree Seeds</option><option value="essenceTreeSeeds">Essence Tree Seeds</option></select><br/><input type="number" id="bottikus_maximus_patchAmmount" value="0" placeholder="Number of Patches you own"></input><br/><button onclick="is_BottkusMaximusFarming = true;">Start Farming</button><button onclick="is_BottkusMaximusFarming = false;">Stop Farming</button></div>';
$("#tab-sub-container-farming").append(html);

var html = '<div><select id="bottikus_maximus_selectedPotion"><option value="stardustPotion">Stardust Potion</option></select><br/><button onclick="is_BottkusMaximusDrinkingPotions = true;">Start Using</button><button onclick="is_BottkusMaximusDrinkingPotions = false;">Stop Using</button></div>';
$("#tab-sub-container-brewing").append(html);


function bottikus_maximus_runfarm() {
	var patches = $("#bottikus_maximus_patchAmmount").val();
	for (var i = 1; i <= patches; i++) {
	    bottikus_maximus_checkPatch(i);
	}
}
function bottikus_maximus_checkPatch(patch) {
	var selectedSeed = $("#bottikus_maximus_selectedSeed").val();
	var isEmpty = (window["farmingPatchTimer" + patch] == 0 && window["farmingPatchStage" + patch] == 0);
	if (isEmpty) {
		//plant
		if (window[selectedSeed] > 0) {
			plantSeed(selectedSeed, patch.toString());
		}
	} else {
		//wait & harvest
		if (window["farmingPatchGrowTime" + patch] < window["farmingPatchTimer" + patch]) {
			//harvest
			openFarmingPatchDialogue(patch);
		}
	}
}

function bottikus_maximus_smelt() {
	if (smeltingAmount == 0 && smeltingBarType == 0 && !$("#notif-smelting").is(":visible")) {
		openFurnaceDialogue(bottikus_maximus_getFurnace());

		//set selection
		selectedBar = $("#bottikus_maximus_selectedBar").val();
		$("#input-smelt-bars-amount").val($("#bottikus_maximus_ammount").val());

		//smelt!
		setTimeout(function(){
			$('#dialogue-furnace-mats-needed-area > input[type="button"]').click();
		}, 1000);
		
		//auto selling
		if ($("#bottikus_maximus_isAutoSell")[0].checked) {
			openSellNPCDialogue($("#bottikus_maximus_selectedBar").val());
			$('#dialogue-sell-item > input[type="button"]:nth-child(5)').click();
		}
	}
}

function bottikus_maximus_getFurnace() {
	var availableFurnaces = ["boundStoneFurnace", "boundBronzeFurnace", "boundIronFurnace", "boundSilverFurnace", "boundGoldFurnace", "boundPromethiumFurnace"];
	for (var i = 1; i <= availableFurnaces.length; i++) {
	    if (window[availableFurnaces[i]] == 1) {
	    	return(availableFurnaces[i]);
	    }
	}
}

function bottikus_maximus_drinkPotions() {
	//drink potion if the player has more than one and he itn't using a potion at the moment
	if (window[$("#bottikus_maximus_selectedPotion").val() + "Timer"] == 0 && window[$("#bottikus_maximus_selectedPotion").val()] > 0) {
		clicksPotion($("#bottikus_maximus_selectedPotion").val());
		setTimeout(function(){
			$("#dialogue-confirm-yes").click();
		}, 1000);
	}
}


setInterval(function() {
	if (is_BottkusMaximusSmelting) {
		bottikus_maximus_smelt();
	}
	if (is_BottkusMaximusFarming) {
		bottikus_maximus_runfarm();
	}
	if (is_BottkusMaximusDrinkingPotions) {
		bottikus_maximus_drinkPotions();
	}
}, 4000);
