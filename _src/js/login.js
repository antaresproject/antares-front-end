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


//icheck init
$('[data-icheck="true"]').iCheck({

    checkboxClass: 'icheckbox_billevo',
    radioClass: 'iradio_billevo',
    increaseArea: '30%'
});

// //mdl form helper
$(".mdl-textfield__input").blur(function() {
    if (!this.value) {
        $(this).prop('required', true);
        $(this).parent().addClass('is-invalid');
    }
});
// $(".btn--submit").click(function(event) {
//     $(this).siblings(".mdl-textfield").addClass('is-invalid');
//     $(this).siblings(".mdl-textfield").children(".mdl-textfield__input").prop('required', true);
// });

validateSubmit = function() {

    $('[data-id="login-page"] .btn--submit').on('click', function() {

        var inputs = $('[data-id="login-page"] input');

        inputs.each(function(index, el) {

            if (!$(this).val()) {
                $(this).parent().addClass('is-invalid');
                return;
            }

        });

        $('#login-form').submit();


    });


};

fancyBg = function() {

};

function updateGradient() {
  
}

fancyBg();

validateSubmit();