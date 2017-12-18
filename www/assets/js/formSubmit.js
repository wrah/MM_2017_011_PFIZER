// Form sumbit (for should be #mainForm, should have a button.formSubmit for sumbition)
  $('#mainForm').on('submit', function(event){
      
      event.preventDefault();
      var instance = $('#mainForm').parsley();

      // Define what's the submit button and its status as well as the delay in its animations
      var submit = $(this).find('.formSubmit'),
          defaultSubmitCopy = $(submit).html(), 
          bufferTime = 1000;

      // Register the messages sent out to the user, remove all previous instances
      var messages = new Object();
          messages.ok = '<div id="form-feedback"><p class="form-message ok">Nous avons reçu votre message !</p><p class="form-message ok">Nous vous contacterons au plus vite.</p></div>';
          messages.ko = '<div id="form-feedback"><p class="form-message ko">Une erreur a été rencontrée. Merci de bien vouloir réessayer.</p></div>';
          messages.errors = '<div id="form-feedback"><p class="form-message error">Attention, ces champs sont obligatoires. Vérifiez que votre email et numéro de téléphone sont valides !</p></div>';
      $('#form-feedback').remove();

      // Create the routine for what happens when the ajax succeeds
      var successRoutine = function(){
        $(submit).html('OK!');
        setTimeout(function(){
          $('#mainForm').slideUp().after(messages.ok);
          $('#share').slideDown();
        }, bufferTime);
      }

      // Create the routine for failure (story of my life)
      var errorRoutine = function(){
        $(submit).removeAttr('disabled').html(defaultSubmitCopy);
        $('#mainForm').prepend(messages.ko);
      }
      
      // if parsley says all is good
      if (instance.isValid()) {
        // We disable the submit button to prevent multiple submits 
        $(submit).attr('disabled', 'disabled').html('Veuillez patienter...');
        
        // We serialize the results
        var value = $(this).serialize();

        // In a simulated delay so feedback can be seen, we launch the ajax process
        setTimeout(function(){
          $.ajax({
            url:'https://6mylxq1qkc.execute-api.us-west-2.amazonaws.com/production/games/v1/sweepstake/',
            data:value,
            type:'POST',
            success:function(msg){
              successRoutine();
            },
            error:function(msg){
              successRoutine();
            }
          });
        }, bufferTime);
      }  
  });