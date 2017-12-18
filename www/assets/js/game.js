jQuery(window).load(function () {

    $('#contestForm').parsley().subscribe('parsley:form:validate', function (formInstance) {

        // if one of these blocks is not failing do not prevent submission
        // we use here group validation with option force (validate even non required fields)
        if (formInstance.isValid()){
          formInstance.submitEvent.preventDefault();

          var errors = 0;

          var checkForErrors = function(){
            $('.questionWrap').each(function(){
              var success = $(this).data('truth'),
                  wrap = $(this);

              if($(success).is(':checked')){
                errors = errors + 0;
                $(wrap).removeClass('errors');
              }
              else{
                errors = errors + 1;
                $(wrap).addClass('errors');
              }
            })

            console.log(errors);
          }

          checkForErrors();

          var successRoutine = function(){
            $('.errorMessage').html('');
            $('#contestForm').slideUp();
            $('#mainIntro').slideUp();
            $('#congrats').slideDown();
          }

          var errorRoutine = function(){
            $('.errorMessage')
              .html("Trouvez les bonnes réponses aux questions <br/>en rouge ci-dessus !")
              .addClass("filled");
          }

          if(errors > 0){
            errorRoutine();
          }
          else{
            successRoutine();
          }
          return;
        }
        // else stop form submission
        formInstance.submitEvent.preventDefault();

        // and display a gentle message
        $('.errorMessage')
          .html("N'oubliez pas de répondre à toutes les questions...<br/>Et trouvez les bonnes réponses !")
          .addClass("filled");
        return;
    });
});
