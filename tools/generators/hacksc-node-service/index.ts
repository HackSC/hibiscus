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
import { fileExists } from 'nx/src/utils/workspace-root';
import { GeneratorOptions } from './schema';

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
  console.log(projectSourcesLocation);

  // creating standard folders for our architecture
  const requiredFolders = [
    'controllers',
    'services',
    'routers',
    'repositories',
    'mappers',
  ];
  requiredFolders.forEach((folderName) => {
    createDirectory(
      joinPathFragments(projectSourcesLocation, `./${folderName}`)
    );
    fileExists;
  });

  // any template files
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    projectSourcesLocation,
    {
      tmpl: '',
      name: schema.name,
    }
  );

  return () => {
    installPackagesTask(tree);
  };
}
