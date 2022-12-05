export {};
declare global {
  interface BuildConstructionSiteJobParameters {
    uuid?: string;
    status: string;
    constructionSiteId: Id<ConstructionSite>;
    room: string;
    jobType: "buildConstructionSite";
  }
}
