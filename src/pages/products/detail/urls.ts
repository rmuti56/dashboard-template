import { UrlPrefixEnum } from "@/enums/url-prefix.enum";
import { productsPagePath } from "..";

export const productDetailPagePath = ":productId";

export const productDetailPageUrl = (productId: string) =>
  `${UrlPrefixEnum.ADMIN}/${productsPagePath}/${productId}`;
