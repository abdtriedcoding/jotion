import UserItem from "./user-menu";
import SearchButton from "./search-button";
import SettingButton from "./setting-button";
import NewPageButton from "./new-page-button";

const Sidebar = () => {
  return (
    <aside className="w-64 p-4 flex-col hidden md:block bg-background dark:bg-[#303030] h-full">
      <UserItem />
      <SearchButton />
      <SettingButton />
      <NewPageButton />
    </aside>
  );
};

export default Sidebar;
