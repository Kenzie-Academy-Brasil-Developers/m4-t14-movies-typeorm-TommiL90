import { Request, Response } from "express";
import { tMovie } from "../interfaces";
import { paginatedListMoviesService } from "../services";

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let perPage: number = Number(req.query.perPage) || 5;
  let page: number = Number(req.query.page) || 1;
  let sort: string = "id";
  const sortParam: any = req.query.sort;

  if (typeof sortParam === "string") {
    const lowercaseSortParam = sortParam.toLocaleLowerCase();

    if (lowercaseSortParam === "price") {
      sort = "price";
    } else if (lowercaseSortParam === "duration") {
      sort = "duration";
    }
  }

  let order: string = "DESC";
  const orderParam: any = req.query.order;

  if (typeof orderParam === "string") {
    const uppercaseOrderParam = orderParam.toUpperCase();

    if (uppercaseOrderParam === "ASC") {
      order = "ASC";
    }
  }

  // perPage = perPage > 5 ? 5 : perPage;
  // page = perPage * (page - 1);

  //sortBy: string, sortOrder: string, pageNumber: number, pageSize: number
  const data = await paginatedListMoviesService(sort, order, page, perPage);

  // page = page / perPage + 1;
  const pages: number = Math.ceil(data.total / perPage);

  const baseURL: string = "http://localhost:3000/movies";
  const prevPage: string | null =
    page - 1 < 1 ? null : `${baseURL}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string | null =
    page + 1 > pages ? null : `${baseURL}?page=${page + 1}&perPage=${perPage}`;

  const pagination = {
    prevPage,
    nextPage,
    pages,
    count: data.total,
    data: data.items,
  };

  return res.status(200).json(pagination);
};

export default listMoviesController;
