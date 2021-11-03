import axios from "axios";

export const getStudents = async () =>
    await axios.get(`https://gist.githubusercontent.com/eallenOP/b40fa9bba517ff258da395c79edd2477/raw/a8175e0b5c915d9e2d857a2f114704094ade22b9/attendance.json/content`);
