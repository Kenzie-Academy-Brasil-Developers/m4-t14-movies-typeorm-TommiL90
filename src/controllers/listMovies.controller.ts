import { Request, Response } from "express";
import { tMovie } from "../interfaces";
import { paginatedListMoviesService } from "../services";

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let page: number =  Number(req.query.page) > 0 ? Number(req.query.page) : 1 //Number(req.query.page) || 1;
  let perPage: number = Number(req.query.perPage) > 0 ? Number(req.query.perPage) : 5;
  let sort: any | undefined = req.query.sort;

  let order: any = req.query.order;


  // perPage = perPage > 5 ? 5 : perPage;
  // page = perPage * (page - 1);

  //sortBy: string, sortOrder: string, pageNumber: number, pageSize: number
  const data: {
    items: tMovie[];
    total: number
  } = await paginatedListMoviesService(sort, order, page, perPage);


  // page = page / perPage + 1;
  const pages: number = Math.ceil(data.total / perPage);

  const baseURL: string = "http://localhost:3000/movies";
  const prevPage: string | null =
    page === 1 ? null : `${baseURL}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string | null =
    page + 1 > pages ? null : `${baseURL}?page=${page + 1}&perPage=${perPage}`;

  const pagination = {
    nextPage,
    prevPage,
    // pages,
    count: data.total,
    data: data.items,
  };

  return res.status(200).json(pagination);
};

export default listMoviesController;
