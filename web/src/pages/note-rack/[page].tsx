import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PageSidebar from '../../components/pageInfo/PageSidebar';
import Editor from '../../components/Editor';
import LoadingPage from '../../components/LoadingPage';
import type PageDataInterface from '../../types/pageTypes';

const NoteRackPage = (props: {pageDataReq: Promise<PageDataInterface>}) => {
  const [pageData, setPageData] = useState<PageDataInterface | Record<string, unknown>>({});
  const { pageDataReq } = props;

  // TODO:EROXL: Add error handling here...
  useEffect(() => {
    (async () => {
      setPageData(await pageDataReq);
    })();
  }, [pageDataReq]);

  return (
    <>
      <Head>
        {
          !pageData.message
            ? (
              <title>Loading...</title>
            )
            : (
              <>
                <title>{(pageData as PageDataInterface).message.style.name}</title>
                <link
                  rel="icon"
                  href={`
                    data:image/svg+xml,
                    <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
                      <text y=%22.9em%22 font-size=%2290%22>
                        ${(pageData as PageDataInterface).message.style.icon}
                      </text>
                    </svg>
                  `}
                  type="image/svg+xml"
                />
              </>
            )
        }
      </Head>
      <div className="w-full h-full overflow-hidden print:h-max print:overflow-visible bg-amber-50 no-scrollbar dark:bg-zinc-700 print:dark:bg-white">
        <div className="absolute z-10 w-screen h-10 print:h-0 bg-amber-50 no-scrollbar dark:bg-zinc-700 print:dark:bg-white" />
        <PageSidebar />
        <DndProvider backend={HTML5Backend}>
          {
            !pageData.message
              ? <LoadingPage />
              : <Editor pageData={pageData as PageDataInterface} setPageData={setPageData} />
          }
        </DndProvider>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, params } = context;
  const { page } = params as { page: string };
  const { cookies } = req;

  return ({
    props: (async () => ({
      pageDataReq: await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/get-page/${page}`, {
        headers: {
          Cookie: Object.keys(cookies).map((cookieKey) => `${cookieKey}=${cookies[cookieKey]}`).join('; '),
        },
      })).json(),
    }))(),
  });
};

export default NoteRackPage;
