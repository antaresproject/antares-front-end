//
// Zero Data Component
//

export default {
    // Gridstack Resize Version
    gridstack() {
        const stringsBase = {
            xs: 'zd--xs',
            xsTxt: 'Extra Small',
            sm: 'zd--sm',
            smTxt: 'Small',
            default: 'zd--default',
            defaultTxt: 'Default',
            lg: 'zd--lg',
            lgTxt: 'Large'
        };
            const adjustZeroDataSize = function (gsi, $zdElement) {
                const pathToTitle = $zdElement.closest('.grid-stack-item-content').find('.card__header--left span');

                if (gsi.width < 5) {
                    $zdElement.attr('class', 'zd ' + stringsBase.xs);
                    pathToTitle.length ? pathToTitle.text(stringsBase.xsTxt) : false;
                } else if (gsi.width < 8) {
                    $zdElement.attr('class', 'zd ' + stringsBase.sm);
                    pathToTitle.length ? pathToTitle.text(stringsBase.smTxt) : false;
                } else if (gsi.width < 12) {
                    $zdElement.attr('class', 'zd ' + stringsBase.default);
                    pathToTitle.length ? pathToTitle.text(stringsBase.defaultTxt) : false;
                } else {
                    $zdElement.attr('class', 'zd ' + stringsBase.lg);
                    pathToTitle.length ? pathToTitle.text(stringsBase.lgTxt) : false;
                }
            };

        $(() => {
            const grid = $('.grid-stack').data('gridstack');
            const $grid = $('.grid-stack');

            $grid.on('change', (event, items) => {
                if (items === undefined) {
                    return false;
                }

                for (let i = 0; i < items.length; i++) {
                    const $zdDiv = $(items[i].el).find('.zd');
                    const currentGsi = items[i];

                    // check it outs, O.G
                    if ($zdDiv !== undefined) {
                        adjustZeroDataSize(currentGsi, $zdDiv);
                    }
                }
            });
        });
    }
};
