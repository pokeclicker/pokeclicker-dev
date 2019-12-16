///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;
    description: string;

    constructor(type: GameConstants.BattleItemType, description: string) {
        let basePrice = GameConstants.ItemPrice[GameConstants.BattleItemType[type]];
        let priceMultiplier = 1;
        super(GameConstants.BattleItemType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
        this.description = description;
    }

    buy(amt: number) {
        player.gainItem(this.name(), amt);
    }

    use() {
        EffectEngineRunner.addEffect(this.name());
    }

    description() {
      return this.description;
    }
}

ItemList['xAttack'] = new BattleItem(GameConstants.BattleItemType.xAttack, '+50% Bonus to Pokemon attack');
ItemList['xClick'] = new BattleItem(GameConstants.BattleItemType.xClick, '+50% Bonus to click attack');
ItemList['xExp'] = new BattleItem(GameConstants.BattleItemType.xExp, '+50% Bonus to experience gained');
ItemList['Token_collector'] = new BattleItem(GameConstants.BattleItemType.Token_collector, '+50% Bonus to dungeon tokens gained');
ItemList['Item_magnet'] = new BattleItem(GameConstants.BattleItemType.Item_magnet, '+50% Chance of gaining an extra item');
ItemList['Lucky_incense'] = new BattleItem(GameConstants.BattleItemType.Lucky_incense, '+50% Bonus to money gained');
