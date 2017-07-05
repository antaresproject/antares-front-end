// 
// Zero Data Component
//


export default {

    // Gridstack Resize Version
    gridstack: function() {

        let classes = {

            xs: 'zd--xs',
            sm: 'zd--sm',
            default: 'zd--default',
            lg: 'zd--lg'

        }

        let adjustZeroDataSize = function(gsi, $zdElement) {

            if (gsi.width < 3) {

                $zdElement.attr('class', 'zd ' + classes.xs);

            } else if (gsi.width < 5) {

                $zdElement.attr('class', 'zd ' + classes.sm);

            } else if (gsi.width < 7) {

                $zdElement.attr('class', 'zd ' + classes.default);

            } else {

                $zdElement.attr('class', 'zd ' + classes.lg);

            }

        };

        $(function() {


            // if ( !$(.))            

            var grid = $('.grid-stack').data('gridstack');
            var $grid = $('.grid-stack');

            $grid.on('change', function(event, items) {

                if ( items === undefined ) {
                    return false;
                }

                for (var i = 0; i < items.length; i++) {

                    var $zdDiv = $(items[i].el).find('.zd');
                    var currentGsi = items[i];

                    // check it outs, O.G
                    if ($zdDiv !== undefined) {

                        adjustZeroDataSize(currentGsi, $zdDiv);

                    }

                }

            });

        });

    }

}