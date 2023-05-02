import MeScreen from '@/app/app/[[...slug]]/meScreen'
import SignOutButton from '@/component/client/auth/sign-out-button'
import ClassScreen from '@/app/app/[[...slug]]/classScreen'
import ClassMemberList from '@/component/app/class/ClassMemberList'
import ClassInviteList from '@/component/app/class/ClassInviteList'
import ClassUI from '@/component/app/AppClassUI'
import ClassSidebarContent from './classSidebarContent'
import ClassSidebar from './classSidebar'
import ClassSidebarItem from './classSidebarItem'
import ClassCategoryList from './classCategoryList'
import CreateClassCategory from './createClassCategory'
import ClassSidebarCategoryContent from './classSidebarCategoryContent'

export default async function ClassroomScreen({ params }: { params: { slug: string[] } }) {

  //Handle Dynamic URL and Metadata Here
  return (
    <ClassUI>
      <MeScreen>
        <h1>This is Me Screen</h1>
        <p>This is Me Screen, for debug only.</p>
        <hr className="border-slate-600 my-4" />
        {/* <h3>Pending Class Invite</h3> */}
        {/* <PendingInviteRequestList /> */}
        <h3>Search for Class</h3>
        <SignOutButton />
      </MeScreen>
      <ClassScreen defaultValue='Home'>

        <ClassSidebar>
          <div>
            <ClassSidebarItem value='Home' />
            <ClassSidebarItem value='Assignment'/>
            {/* <ClassSidebarItem value='Chat'/> */}
          </div>
          <ClassCategoryList />
          <CreateClassCategory />
        </ClassSidebar>

        <ClassSidebarContent value='Home'>
          <h1>This is Class Screen</h1>
          <div>This is server side-rendering</div>
          <h3>Member List</h3>
          <ClassMemberList />
          <h3>Invite Link</h3>
          <ClassInviteList />
        </ClassSidebarContent>

        <ClassSidebarContent value='Assignment'>
          Hellos
        </ClassSidebarContent>

        <ClassSidebarCategoryContent>
          
        </ClassSidebarCategoryContent>
        
        {/* <ClassSidebarContent value='Chat'>

        </ClassSidebarContent> */}


      </ClassScreen>
    </ClassUI>
  );
} 



