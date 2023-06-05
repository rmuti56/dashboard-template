import { UrlPrefixEnum } from "@/enums/url-prefix.enum";
import { productsPagePath } from "..";

export const createProductPagePath = "create-product";

export const createProductPageUrl = `${UrlPrefixEnum.ADMIN}/${productsPagePath}/${createProductPagePath}`;
