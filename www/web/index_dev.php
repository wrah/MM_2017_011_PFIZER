<?php

use Symfony\Component\Debug\Debug;
use Silex\Provider\MonologServiceProvider;
use Silex\Provider\WebProfilerServiceProvider;

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.
/*if (
	isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !in_array(@$_SERVER['REMOTE_ADDR'], array('10.0.2.2', '127.0.0.1', 'fe80::1', '::1'))
)
{
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
}*/

require_once(__DIR__ . '/../vendor/autoload.php');

Debug::enable();

$application = require(__DIR__ . '/../src/application.php');

$application->register(new MonologServiceProvider(), array(
    'monolog.logfile' => $application['application.root'] . '/var/logs/silex_dev.log',
));

$application->register(new WebProfilerServiceProvider(), array(
    'profiler.cache_dir' => $application['application.root'] . '/var/cache/profiler',
));

$application->mount('/', new Wrah\Swabbie\MainController());

$application->run();