import {FC, useState, useRef, useEffect} from "react";
import css from "./CategoryProductThumbnail.module.scss";
import classNames from "classnames";
import Header from "./Header";
import Discount from "./Discount";
import Size from "./Size";
import Figure from "./Figure";
import TextLoader from "./Loaders/TextLoader";

interface Props {
  productData: ProductBasicDataResponse;
  onHover: (id: null | string) => void;
  hovered: boolean;
}

const CategoryProductThumbnail: FC<Props> = ({
  productData: {id, brand, model, price, initial_price, thumbnail, stock_array},
  onHover,
  hovered,
}) => {
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sizesStyle = {
    "--get-sizes-height": `${height.toString()}px`,
  } as React.CSSProperties;

  const elementRef = useRef<HTMLDivElement>(null);

  const onLoad = (p: boolean) => {
    setIsLoading(p);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      if (elementRef.current !== null) {
        setHeight(elementRef.current.offsetHeight);
      }
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      key={id}
      className={classNames(css["product-thumbnail"])}
      onMouseEnter={() => {
        onHover(id);
      }}
      onMouseLeave={() => {
        onHover(null);
      }}
    >
      <div
        className={classNames(
          css["image-overlay"],
          hovered ? css["hovered-state"] : ""
        )}
        style={sizesStyle}
      ></div>
      <div
        className={classNames(
          css["product-content"],
          hovered ? css["hovered-state"] : "",
          isLoading && css["loading-state"]
        )}
      >
        <Figure
          thumbnailUrl={thumbnail}
          hovered={hovered}
          brand={brand}
          model={model}
          isLoading={isLoading}
          onLoad={onLoad}
        />
        {isLoading ? (
          <div className={css["loading-state-box"]}>
            <TextLoader />
          </div>
        ) : (
          <>
            <Header sellingPrice={price} brand={brand} model={model} />
            <Discount sellingPrice={price} listingPrice={initial_price} />
          </>
        )}
      </div>
      <section
        className={classNames(
          css["size-container"],
          hovered && !isLoading ? css["hovered-state"] : css.hide
        )}
        ref={elementRef}
      >
        <Size arrayOfSizes={stock_array} />
      </section>
    </article>
  );
};

export default CategoryProductThumbnail;
