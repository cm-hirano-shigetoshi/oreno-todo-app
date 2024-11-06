export type Project = {
  projectcode: string;
  taskcodes: Taskcode[];
  projectname?: string;
  color?: string;
  assign?: number;
};

export type Taskcode = {
  taskcode: string;
  name?: string;
  keywords?: string[];
};

export const getProjectsByDate = (
  projects: { [date: string]: Project[] },
  date: string
) => {
  const yyyymm = date.slice(0, 7);
  if (yyyymm in projects) {
    return projects[yyyymm];
  } else {
    return [];
  }
};

export const getProjectByTaskcode = (
  projects: Project[],
  taskcode: string
): Project | undefined => {
  if (projects.length === 0) return null;
  const projectCandidates = projects.filter(
    (project) =>
      project.taskcodes.filter((tc) => {
        return tc.taskcode === taskcode;
      }).length > 0
  );
  if (projectCandidates.length === 0) {
    return undefined;
  } else if (projectCandidates.length === 1) {
    return projectCandidates[0];
  } else {
    throw new Error("複数プロジェクトに同一taskcodeが存在します");
  }
};

export const getQuickTaskcodesByDate = (
  taskcodes: { [date: string]: Taskcode[] },
  date: string
): Taskcode[] => {
  const yyyymm = date.slice(0, 7);
  if (yyyymm in taskcodes) {
    return taskcodes[yyyymm];
  } else {
    return [];
  }
};
