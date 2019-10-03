class MapHelper {
    public static returnToMap(){
      if (player.currentTown()){
        return this.moveToTown(player.currentTown());
      }
      if (player.route()){
        return this.moveToRoute(player.route(), player.region);
      }
    }

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (isNaN(route)) return;
        let genNewEnemy = false;
        if (route != player.route()) {
          genNewEnemy = true
        }
        if (this.accessToRoute(route, region)) {
            player.route(route);
            player.region = region;
            player.currentTown('');
            if (genNewEnemy){
              Battle.generateNewEnemy();
            }
            Game.gameState(GameConstants.GameState.fighting);
            Game.applyRouteBindings();
        }
        else {
            Notifier.notify("You don't have access to that route yet.", GameConstants.NotificationOption.warning);
        }
    };

    private static hasBadgeReq(route, region) {
        return player.hasBadge(GameConstants.routeBadgeRequirements[region][route]);
    }

    private static hasDungeonReq(route, region) {
        let dungeonReq = GameConstants.routeDungeonRequirements[region][route];
        return dungeonReq == undefined || 0 < player.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeonReq)]();
    }

    private static hasRouteKillReq(route, region) {
        let reqList = GameConstants.routeRequirements[region][route];
        if (reqList == undefined) {
            return true;
        }
        for (let i = 0; i < reqList.length; i++) {
            let route: number = reqList[i];
            if (player.routeKillsObservable(route)() < player.routeKillsNeeded) {
                return false
            }
        }
        return true;
    }

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        return MapHelper.hasBadgeReq(route, region) && MapHelper.hasDungeonReq(route, region) && MapHelper.hasRouteKillReq(route, region);
    };

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        let cls;

        if (player.route() == route && player.region == region) {
            cls = "currentRoute";
        }
        else if (MapHelper.accessToRoute(route, region)) {
            cls = "unlockedRoute";
        }
        else {
            cls = "lockedRoute";
        }

        if (GameConstants.WaterRoutes[region].has(route))  {
            cls = cls + ' ' + 'waterRoute'
        }

        return cls
    }

    public static calculateTownCssClass(town: string): string {
        if (player.hasKeyItem(town)) {
            return "city unlockedTown";
        }
        if (player.currentTown() == town) {
            return "city currentTown";
        }
        if (MapHelper.accessToTown(town)) {
            if (dungeonList.hasOwnProperty(town)) {
                if (DungeonRunner.dungeonCompleted(dungeonList[town], false)) {
                    return "dungeon completedDungeon"
                }
                return "dungeon unlockedDungeon"
            }
            return "city unlockedTown";
        }
        if (dungeonList.hasOwnProperty(town)) {
            return "dungeon"
        }
        return "city";
    }

    public static accessToTown(townName: string): boolean {
        let town = TownList[townName];
        if (!town) return false;
        return town.isUnlocked();
    };

    public static moveToTown(townName: string) {
        if (MapHelper.accessToTown(townName)) {
            Game.gameState(GameConstants.GameState.idle);
            player.route(0);
            player.town(TownList[townName]);
            player.currentTown(townName);
            //this should happen last, so all the values all set beforehand
            Game.gameState(GameConstants.GameState.town);
            Game.applyRouteBindings();
        } else {
            Notifier.notify("You don't have access to that location yet.", GameConstants.NotificationOption.warning);
        }
    };

    public static updateAllRoutes() {
        const region = player.region;
        for (let route = GameConstants.RegionRoute[region][0]; route < GameConstants.RegionRoute[region][1]; route++) {
            if (MapHelper.accessToRoute(route, region)) {
                $("[data-route='" + route + "']").removeClass('currentRoute').removeClass('lockedRoute').addClass('unlockedRoute');
            }
        }
    }

    public static validRoute(route: number = 0, region: GameConstants.Region = 0): boolean {
        return route >= GameConstants.RegionRoute[region][0] && route <= GameConstants.RegionRoute[region][1];
    }

    public static openShipModal() {
        let openModal = () => {$("#ShipModal").modal('show');}
        switch (player.region) {
            case 0:
                if (TownList["Vermillion City"].isUnlocked() && player.highestRegion > 0) {
                    openModal();
                    return;
                }
            case 1:
                if (TownList["Olivine City"].isUnlocked()) {
                    openModal();
                    return;
                }
            case 2:
                if (TownList["Slateport City"].isUnlocked()) {
                    openModal();
                    return;
                }
        }
        Notifier.notify("You cannot access this dock yet", GameConstants.NotificationOption.warning)
    }

    public static ableToTravel() {
        return player.highestRegion < GameConstants.MAX_AVAILABLE_REGION && player.caughtPokemonList.length >= GameConstants.TotalPokemonsPerRegion[player.highestRegion];
    }

    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            player.highestRegion++;
            MapHelper.moveToTown(GameConstants.StartingTowns[player.highestRegion]);
            player.region = player.highestRegion;
        }
    }

}
