/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Files
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/


var pluginName = "gsGit";

var restrain = function() {


    if (!$('table.dataTable').length) {
        return false;
    }

}


ready('table.dataTable[data-adjust-height]', function(element) {
    window.gridstackFit();
});



// return function() {



//     // loadingque+1
// }

// $(window).on('resize', function() {
//     window.pluginNme();();
// });



(function gsGit(window, document) {

    window.gridstackFit = function() {


        var gs = $('.grid-stack').data('gridstack'),
            cH = gs.cellHeight(),
            estimatedCellHeightInPx = 32.5;

        function gridCalc(element) {

            var $self = $(element);

            var gsElement = $self.closest('.grid-stack-item'),
                currentX = gsElement.data('data-gs-x'),
                currentY = gsElement.data('data-gs-y'),
                currentH = gsElement.data('data-gs-height'),
                currentW = gsElement.data('data-gs-width');

            gsElement.css('transition-duration', '0ms');

            setTimeout(function() {
                var gsElement = $self.closest('.grid-stack-item'),
                    currentX = gsElement.data('data-gs-x'),
                    currentY = gsElement.data('data-gs-y'),
                    currentH = gsElement.data('data-gs-height'),
                    currentW = gsElement.data('data-gs-width');

                var tableFullHeight = $self.closest('.dataTables_wrapper').outerHeight(true);
                var tblcHeaderHeight = $self.closest('.tbl-c').find('.card-ctrls').outerHeight(true);

                // Exception for TABS

                if ($self.closest('.mdl-tabs').length ) {

                    heightFormula = parseInt((tableFullHeight + tblcHeaderHeight + 52) / estimatedCellHeightInPx, 10);

                } else {

                    heightFormula = parseInt((tableFullHeight + tblcHeaderHeight) / estimatedCellHeightInPx, 10);

                }


                gs.update(gsElement, currentX, currentY, currentW, heightFormula );

            }, 100);

            setTimeout(function() {
                var gsElement = $self.closest('.grid-stack-item'),
                    currentX = gsElement.data('data-gs-x'),
                    currentY = gsElement.data('data-gs-y'),
                    currentH = gsElement.data('data-gs-height'),
                    currentW = gsElement.data('data-gs-width'),
                    tableFullHeight = $self.closest('.dataTables_wrapper').outerHeight(true),
                    tblcHeaderHeight = $self.closest('.tbl-c').find('.card-ctrls').outerHeight(true);

                // Exception for TABS
                if ($self.closest('.mdl-tabs')[0]) {

                    heightFormula = parseInt((tableFullHeight + tblcHeaderHeight + 52) / estimatedCellHeightInPx, 10);
                } else {

                    heightFormula = parseInt((tableFullHeight + tblcHeaderHeight) / estimatedCellHeightInPx, 10);

                }

                var wholeHeight = $self.closest('.grid-stack-item-content').outerHeight(true),
                    heightDifference = wholeHeight - (tableFullHeight + tblcHeaderHeight),
                    correction = parseInt(heightDifference / estimatedCellHeightInPx, 10);

                if (correction > 0) {
                    gs.update(gsElement, currentX, currentY, currentW, heightFormula - correction);
                } else if (heightDifference < 0) {
                    // when small records ammount
                    gs.update(gsElement, currentX, currentY, currentW, heightFormula - correction + 1);
                }

            }, 200);

            setTimeout(function() {
                gsElement.css('transition-duration', '150ms');
                $self.closest('.tbl-c').perfectScrollbar('update');
            }, 300);
        }

        $('.tbl-c table').on('page.dt length.dt', function() {

            gridCalc(this);

        });

        gridCalc('table.dataTable');

    }

})(window, document);
