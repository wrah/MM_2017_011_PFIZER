<?php

namespace Wrah\Swabbie\Console\Command;

use Knp\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\TableHelper;

class RouterDebugCommand extends Command
{
	const OUTPUT_FORMAT_JSON = 'json';

	protected $outputFormat;

	protected function configure()
	{
		$this->setName('debug:router');
		$this->setDescription('List all routes');
		$this->addOption(
			'output-format',
			null,
			InputOption::VALUE_OPTIONAL,
			'Configuration file',
			self::OUTPUT_FORMAT_JSON
		);
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$this->outputFormat = $input->getOption('output-format');

		$collection = $this->getSilexApplication()['controllers']->flush();

		$routes = array();

		if (! empty($collection))
		{
			foreach ($collection as $name => $route)
			{
				$routes[] = array(
					'name' => $name,
					'path' => $route->getPath(),
					'methods' => $route->getMethods()
				);
			}
		}

		switch ($this->outputFormat)
		{
			case self::OUTPUT_FORMAT_JSON:
			default:
				$outputText = json_encode($routes);
		}

		$output->writeln($outputText);
	}
}
