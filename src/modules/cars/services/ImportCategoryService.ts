import fs from 'fs';
import csvParse from 'csv-parse';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { ICategoriesRepository } from '../repositories/implementations/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryService {
  private categoriesRepository: ICategoriesRepository;
  constructor() {
    this.categoriesRepository = CategoriesRepository.getInstance();
  }

  loadingCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', error => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadingCategories(file);

    categories.map(async category => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
