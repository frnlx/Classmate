import ClassSidebarItem from "./classSidebarItem";

const ClassCategoryList = () => {

  return (
    <div className="py-4">
      <div className="font-bold text-sm text-slate-600 pb-2">Categories</div>
      {
        [...Array(3)].map((_, idx)=><ClassSidebarItem key={idx} value={"categoryid"+idx} />)
      }
    </div>
  );
}
 
export default ClassCategoryList;