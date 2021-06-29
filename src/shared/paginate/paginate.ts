import { Pagination } from './pagination';
import { FindOptions, Model } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

type TypePaginate = (
  repository: ModelCtor,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  searchOptions?: FindOptions
) => Promise<Pagination<Model>>;

const paginate: TypePaginate = async (repository, query, searchOptions) => {
  const page = query.page > 1 ? query.page : 1;

  const limit = query.limit >= 10 ? query.limit : 10;

  const offset = (query.page > 1 ? query.page - 1 : 0) * limit;

  const { rows: items, count: total } = await repository.findAndCountAll({
    offset,
    limit,
    ...searchOptions,
  });

  query.limit = limit;
  query.page = page;

  const pageCount = -~(total / limit);
  const isNext = pageCount >= page + 1;
  const isPrevious = page > 1 && pageCount >= page - 1;

  const routes = convertQuery(query, isNext, isPrevious);

  return new Pagination(
    items,
    items.length,
    total,
    pageCount,
    routes.next,
    routes.previous
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertQuery(query: any, isNext: boolean, isPrevious: boolean) {
  const routes: { next: string; previous: string } = {
    next: '',
    previous: '',
  };
  if (!isNext && !isPrevious) return routes;

  const myURL = new URL(query.route);

  for (const key of Object.keys(query)) {
    if (['page', 'route'].includes(key)) continue;
    myURL.searchParams.set(key, query[key]);
  }

  if (isNext) {
    myURL.searchParams.set('page', query.page + 1);
    routes.next = myURL.toString();
  }

  if (isPrevious) {
    myURL.searchParams.set('page', '' + (query.page - 1));
    routes.previous = myURL.toString();
  }

  return routes;
}

export { paginate };
