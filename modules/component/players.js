import {rootStyle} from '../util.js';
import '../../styles/component/players.css';

export default class MinimalUIPlayers {

    static cssPlayersSmallFontSize = '12px';
    static cssPlayersSmallWidth = '150px';
    static cssPlayersStandardFontSize = 'inherit';
    static cssPlayersStandardWidth = '200px';

    static initSettings() {
        game.settings.register('minimal-ui', 'playerList', {
            name: game.i18n.localize("MinimalUI.PlayersBehaviourName"),
            hint: game.i18n.localize("MinimalUI.PlayersBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "autohide",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'playerListSize', {
            name: game.i18n.localize("MinimalUI.PlayersSizeName"),
            hint: game.i18n.localize("MinimalUI.PlayersSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "small",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {

        Hooks.on('renderPlayerList', async function() {
            const players = $("#players");

            players[0].val = "";
            const plSize = game.settings.get('minimal-ui', 'playerListSize');

            switch(game.settings.get('minimal-ui', 'playerList')) {
                case 'default': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--playerwidth', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidth', MinimalUIPlayers.cssPlayersStandardWidth);
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--playerwidth', '200px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'inline');
                    // ---
                    break;
                }
                case 'autohide': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersSmallFontSize);
                    } else {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '2px');
                    rootStyle.setProperty('--playerh3w', '0%');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        players.css('border-image', 'none');
                        players.css('border-color', 'black');
                        players.hover(
                            function() {
                                players.css('border-image', '');
                                players.css('border-color', '');
                            },
                            function() {
                                players.css('border-image', 'none');
                                players.css('border-color', 'black');
                            }
                        );
                    }
                    // Compatibility for Raise Hand module
                    if (game.modules.has('raise-my-hand') && game.modules.get('raise-my-hand').active) {
                        rootStyle.setProperty('--playerwidth', '42px');
                        rootStyle.setProperty('--playerslh', '20px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'none');
                    if (game.system.data.name === 'swede') {
                        players.hover(
                            function() {
                                $(".bennies-count").show();
                            },
                            function() {
                                $(".bennies-count").hide();
                            }
                        );
                    }
                    // ---
                    break;
                }
            }
            if (game.settings.get('minimal-ui', 'hotbar') === 'autohide') {
                rootStyle.setProperty('--playerbot', '2px');
            }
            // DnD UI Special Compatibility
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
            }
            // ---
        });

    }

}