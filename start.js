let _modPath;

// Let's set rs as the god, GetRootScope()
const rs = GetRootScope();

// This is for opening the mod link in-game.
// GetRootScope().OpenMod = () => Remote.app.openLink('http://steamcommunity.com/sharedfiles/filedetails/stats/1109753463');

// THis says the mod loaded in console.
Helpers.ConsoleInfo('[MOD] Sandbox: Helper loaded!');


exports.initialize = (modPath) => {
	_modPath = modPath;

	// Add new menu item
	Modding.setMenuItem({
		name: 'sandbox',
		tooltip: "Sandbox Mod",
		tooltipPosition: 'top',
		faIcon: 'fa-terminal',
		badgeCount: 0,
	});

	// Define custom view
	exports.views = [{
		name: 'sandbox',
		viewPath: _modPath + 'view.html',
		controller: function ($rootScope) {
			this.giveMoney = (amount) => {
				GetRootScope().confirm('Êtes vous sûr ?', `Es-tu sûr de vouloir: ${numeral(amount).format(Configuration.CURRENCY_FORMAT)} ?`, () => {
					$rootScope.settings.balance += amount
					//$rootScope.addNotification("You 'borrowed' " + numeral(amount).format(Configuration.CURRENCY_FORMAT) + " !", 1)
				});
			}

			this.giveXP = (amount) => {
				$rootScope.confirm('Êtes vous sûr ?', `Es-tu sûr de vouloir: ${(amount)}XP ?`, () => {
					$rootScope.settings.xp += amount
					//$rootScope.addNotification("Added " + amount + " XP!", 1);
				});
			}

			this.giveRP = (amount) => {
				$rootScope.confirm('Êtes vous sûr ?', `Es-tu sûr de vouloir: ${(amount)}XP ?`, () => {
					$rootScope.settings.researchPoints += amount
					//$rootScope.addNotification("Added " + amount + " XP!", 1);
				});
			}

			this.maxmood = () =>{
				$rootScope.confirm('Êtes vous sûr ?', `This will bring every employee's mood 100% (J'ai pas traduit, car sinon ça serait incompréhensible)`, () => {
					Cheats.EveryoneHappy()
				});
			}

			// this.giveMaxTire = () => {
				// $rootScope.confirm('Êtes vous sûr ?', `Are you sure you want get max tire (xp) ? (Si tu regardes ça, sache que c'est bugger donc, je l'ai retirer pour que ça reste un minimum optimiser)`, () => {
					// Cheats.GetMaxTier()
					//$rootScope.addNotification("Max tier given.", 1);
				// });
			// }

			this.giveMoreUsers = (product_id, amount) => {
				$rootScope.confirm('Êtes vous sûr ?', `Es-tu sûr de vouloir obtenir: x${(amount)} d'utilisateurs ?`, () => {
						for (var key in GetRootScope().settings.progress.products) {
							console.log(key)
								GetRootScope().settings.progress.products[key].users.total += amount;
								GetRootScope().settings.progress.products[key].users.potentialUsers += amount;
						}
						//$rootScope.addNotification("Added " + amount + "users", 1);
					});
			}


			this.NextDay = () => {
				$rootScope.confirm('Êtes-vous sûr ?', `Es-tu sûr de vouloir sauter un jour ?`, () => {
					Cheats.SkipADay()
					//$rootScope.addNotification("You skipped one day.", 1);
				});
			}

			this.InventoryGive = (amount) => {
				$rootScope.confirm('Êtes-vous sûr ?', `Es-tu sûr de vouloir dupliquer x${(amount)} tes items ?`, () => {
					Components.forEach(t => {
						// Check if the inventory item is researched and built once,
						// solves the NaN problem
						if(GetRootScope().settings.inventory[t.name] > 0)
						GetRootScope().settings.inventory[t.name] += 1000
					});
					//$rootScope.addNotification("Added 500 of every item to your inventory.", 1);
				});
			}
		}
	}]
}

Helpers.ConsoleInfo('[MOD] Sandbox: Menu loaded!');

exports.onUnsubscribe = done => {
	Helpers.ConsoleInfo(`[MOD] Sandbox: User has just unsubscribed from this mod... :( `);
	done();
}
