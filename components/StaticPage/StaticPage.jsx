"use client"
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";


const StaticPage = ({ data, basicData }) => {
  // Dohvati trenutni slug iz URL-a

  const params = useParams();
  const router = useRouter();
  const slug = params?.slug || "slug"; // Ako nije pronađen slug, koristi "slug" kao podrazumevani
  if (slug == 'kontakt') { router.push('/kontakt') }
  if (slug == 'o-nama') { router.push('/o-nama') }

  const staticData = data?.items?.map((item) => item);
  const keyGenerator = (prefix) => {
    return `${prefix}-${Math.random().toString(36)}`;
  };


  return (
    <>
      {/* Breadcrumb navigacija */}
      <Breadcrumbs currentPage={basicData.basic_data.name} marginTop="mt-0 md:mt-8" />
      <div className={`mt-10`}>
        {staticData?.map((item) => {
          switch (item?.type) {
            case "multiple_images":
              return (
                <div
                  key={keyGenerator("multiple_images")}
                  className={`w-[90%] !max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4`}
                >
                  {item?.content?.map((image) => {
                    return (
                      <div
                        key={keyGenerator("image")}
                        className={`flex justify-center col-span-1 relative `}
                      >
                        <div
                          className={`max-sm:h-[280px] sm:h-[300px] lg:h-[450px] 2xl:h-[500px]`}
                        >
                          <Image
                            src={image?.file}
                            alt={``}
                            fill
                            sizes="100vw"
                            priority
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );

              break;

            case "html_editor":
              return (
                <div
                  key={keyGenerator("html")}
                  className={`w-[90%] mx-auto 2xl:w-[85%] prose !max-w-full  leading-tight mt-20`}

                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
              );
              break;

            case "textarea":
              return (
                <div
                  key={keyGenerator("textarea")}
                  className={`w-[90%] mx-auto 2xl:w-[85%] flex items-center justify-center !max-w-full `}
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
              );

              break;
          }
        })}
      </div>
    </>
  );
};

export default StaticPage;
