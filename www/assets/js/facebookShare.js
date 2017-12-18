function postMessageFB(mName, mCaption, mDesc, mLink, mPicture){
  var urlMatch = new RegExp("^([^:]+://[^/]+/[0-9]{2}/s[0-9]+/)");
  var urlMatchNoS = new RegExp("^([^:]+://[^/]+/[0-9]{2}/)");
  
  if (!mLink.match(urlMatch) && document.location.href.match(urlMatch)) {
    mLink = mLink.replace(urlMatchNoS, document.location.href.match(urlMatch)[1]) ;
  }

  var args = {
      'caption':mCaption,
      'description':mDesc,
      'display': 'popup',
      'link':mLink,
      'method':'feed',
      'name':mName
  };

  if (mPicture != ''){
      args.picture = mPicture;
  }

  console.log('args: ');
  console.log(args);

  FB.ui(args,
     function(response) {
       if (response && response.post_id) {
         console.log("Notification publiée : "+response.post_id);
          $.get(
              'v1/_ajax_fb_share_incentivation.cfm?cfid=81690475&cftoken=61646220&uk=Q90JOOJM1HN',
              function (resp) {
                  $("#fbShareWallBonusWrapper").html(resp);
                  $(".fb_button").hide();
              }
          );
       } else {
         console.log("La notification n'a pas été publiée.");
       }
     }
   );
  return false;
}

function sendRequestViaMultiFriendSelector() {
  FB.ui({method: 'apprequests',
    message: 'Je viens juste de participer au jeu concours NATURA BRASIL. Participez et gagnez un lot de produits de la gamme EKOS CASTANHA'
  }, requestCallback);
}

function requestCallback(response) {
  // Handle callback here
  if (response && response.request && response.to){
    $.post(
      /* 'https://player.qualifio.com/facebook/qualifio/fb_requests_create.cfm', */
      '/portal/facebook/fb_requests_create.cfm',
      { request_id: response.request, request_to: response.to, url: "http://www.cosmopolitan.fr/naturabrasil" },
      function (resp) {
      }
    );
  }
}

var onSendButtonClick = function(link) {
  var args = {
    'method':'send',
    'display': 'popup',
    'link':link
  };

  FB.ui(args); 
  return false;
}

jQuery('.share-button').click(function(event){
  event.preventDefault();
})