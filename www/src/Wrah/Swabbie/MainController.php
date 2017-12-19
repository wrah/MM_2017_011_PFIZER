<?php

namespace Wrah\Swabbie;

use Silex\Application as Application;
use Silex\ControllerProviderInterface;

class MainController implements ControllerProviderInterface
{
  /* Uncomment for articles */
  /*private static $articles = array(
    array(
    )
  );*/

  public function connect(Application $application)
  {
    $factory = $application['controllers_factory'];
    /* Uncomment for articles */
    /*$factory->get(
        '/article/{articleSlug}.html/{gmcHeader}',
        'Wrah\Swabbie\MainController::articleAction'
    )->value('gmcHeader', '')->bind('article');*/

    $factory->get(
      '/{gmcHeader}',
      'Wrah\Swabbie\MainController::indexAction'
    )->value('gmcHeader', '')->bind('homepage');

    return $factory;
  }

  /* Uncomment for articles */
  /*
  static public function articleAction(Application $application, $gmcHeader, $articleSlug)
  {
    $mc2mRubricId = "2007366";
    if(!$gmcHeader)
    {
        $header = file_get_contents("http://www.magicmaman.com/chunk/top/". $mc2mRubricId);
        $footer = file_get_contents("http://www.magicmaman.com/chunk/bottom/". $mc2mRubricId);
    }
    else
    {
        $header = '';
        $footer = '';
    }

    return $application['twig']->render(
      '/pages/article.html.twig',
      array(
        'title' => $title,
        'header' => $header,
        'footer' => $footer,
        'articles' => static::$articles,
        'slug' => $articleSlug,
        'facebook' => array(
          'enabled' => true,
          'appId' => "XXXXXXXXXXXX",
          'baseURL' => "http://www.google.com",
          'shareURL' => 'http://www.google.com',
          'shareDesktop' => 'http://www.google.com',
          'shareImage' => "visuelDePartage.jpg",
          'title' => "Titre de partage", 
          'name' => "Nom de site", 
          'baseline' => " ", 
          'description' => "Texte de partage"
        )
      )
    );
  }*/

  
  static public function indexAction(Application $application, $gmcHeader)
  {
    $mc2mRubricId = "2007366";
    if(!$gmcHeader)
    {
        $header = file_get_contents("http://www.magicmaman.com/chunk/top/". $mc2mRubricId);
        $footer = file_get_contents("http://www.magicmaman.com/chunk/bottom/". $mc2mRubricId);
    }
    else
    {
        $header = '';
        $footer = '';
    }
    return $application['twig']->render(
      'index.html.twig',
      array(
        'title' => "TITRE A REMPLIR",
        'header' => $header,
        'footer' => $footer,
        'facebook' => array(
          'enabled' => true,
          'appId' => "XXXXXXXXXXXX",
          'baseURL' => "http://www.google.com",
          'shareURL' => 'http://www.google.com',
          'shareDesktop' => 'http://www.google.com',
          'shareImage' => "visuelDePartage.jpg",
          'title' => "Titre de partage", 
          'name' => "Nom de site", 
          'baseline' => " ", 
          'description' => "Texte de partage"
        )
      )
    );
  }
}
