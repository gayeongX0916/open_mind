import { getSubjects } from "@/services/subjects/getSubjects";
import ListClientPage from "@/components/ListClientPage";

const ListPage = async () => {
  const limit = 8;
  const offset = 0;

  const { results } = await getSubjects(limit, offset);

  return <ListClientPage initialSubjects={results} limit={limit} />;
};

export default ListPage;
