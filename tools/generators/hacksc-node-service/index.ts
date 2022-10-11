import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/express';
import { Linter } from '@nrwl/linter';
import { createDirectory } from 'nx/src/utils/fileutils';
import { GeneratorOptions } from './schema';
import * as yargsParser from 'yargs-parser';
import { argv } from 'process';

export default async function (tree: Tree, schema: GeneratorOptions) {
  // generate a generic express.js app
  await applicationGenerator(tree, {
    name: schema.name,
    skipFormat: false,
    skipPackageJson: false,
    linter: Linter.EsLint,
    unitTestRunner: 'jest',
    js: false,
    pascalCaseFiles: false,
  });
  await formatFiles(tree);

  const projectSourcesLocation = readProjectConfiguration(tree, schema.name)
    .sourceRoot!;

  // creating standard folders for our architecture on non-dryruns
  const cliOptions = yargsParser(argv);
  const isDryRun = cliOptions['dry-run'] || cliOptions['dryRun'];
  if (!isDryRun) {
    const requiredSubfolders = [
      'controllers',
      'services',
      'routers',
      'repositories',
      'mappers',
    ];
    requiredSubfolders.forEach((folderName) => {
      const subfolderDirectoryPath = joinPathFragments(
        projectSourcesLocation,
        `./${folderName}`
      );
      createDirectory(subfolderDirectoryPath);
      tree.write(joinPathFragments(subfolderDirectoryPath, '.gitkeep'), '');
    });
  } else {
    console.log('Skipping creation of standard folders due to dry run');
  }

  // any template files
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    joinPathFragments(projectSourcesLocation, '../'),
    {
      tmpl: '',
      name: schema.name,
    }
  );

  return () => {
    installPackagesTask(tree);
  };
}
