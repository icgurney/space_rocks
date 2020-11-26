import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { apod } from "../api/apod";

export default function APOD({ apod }: APODProps) {
  const router = useRouter();
  const { date, error } = router.query;

  return (
    <div>
      <p>
        Date: {date} {apod.title}
      </p>
      <img src={apod.url} alt={apod.title} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}&date=${context.params.date}`
  );
  const apod: APODProps = await res.json();
  console.log(res, apod);
  return {
    props: { apod }, // will be passed to the page component as props
  };
};

export interface APODProps {
  apod: {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  };
}
