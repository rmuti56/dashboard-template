import { UrlPrefix } from "@/enums/url-prefix.enum";
import { productsPagePath } from "..";

export const createProductPagePath = "create-product";

export const createProductPageUrl = `${UrlPrefix.ADMIN}/${productsPagePath}/${createProductPagePath}`;
