<?php
date_default_timezone_set('Europe/Paris');
use Silex\Application;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\HttpFragmentServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;

use Knp\Provider\ConsoleServiceProvider;

use Wrah\Swabbie\MainController;

require_once(__DIR__ . '/../vendor/autoload.php');

$application = new Application();

$application['application.root'] = realpath(__DIR__ . '/..');

$application->register(
	new DoctrineServiceProvider(),
	array(
		'db.options' => array(
			'driver' => 'pdo_sqlite',
			'path' => $application['application.root'] . '/data/swabbie.db'
		)
	)
);

$application->register(new HttpFragmentServiceProvider());
$application->register(new ServiceControllerServiceProvider());

$application->register(
	new TwigServiceProvider(),
	array(
		'twig.path' => $application['application.root'] . '/templates/'
	)
);
$application->register(new UrlGeneratorServiceProvider());

$application->register(new ConsoleServiceProvider(), array(
	'console.name' => 'Application',
	'console.version' => '1.0.0',
	'console.project_directory' => $application['application.root']
));

$application->mount('/', new MainController());

return $application;
