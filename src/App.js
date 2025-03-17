import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ProtectedRoute from './components/Hooks/ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddShift from './Pages/shifts/AddShift'
import AddShiftSubject from './Pages/shifts/AddShiftSubject'
import ShiftSubject from './Pages/shifts/ShiftSubject'
import Shifts from './Pages/shifts/Shifts'

const UnitList = React.lazy(() => import('./Pages/units/Unit'))
const AddUnit = React.lazy(() => import('./Pages/units/AddUnit'))
const TopicLsit = React.lazy(() => import('./Pages/topic/TopicPage'))
const AddTopic = React.lazy(() => import('./Pages/topic/AddTopicPage'))
const CareInstructionPageList = React.lazy(() => import('./Pages/CareInstructionPage'))
const AddCareInstructionPage = React.lazy(() => import('./Pages/AddCareInstructionPage'))
const AdditionalInfoPageList = React.lazy(() => import('./Pages/AdditionalInfoPage'))
const AddAdditionalInfoPage = React.lazy(() => import('./Pages/AddAdditionalInfoPage'))
const TestimonialPage = React.lazy(() => import('./Pages/testimonial/TestimonialPage'))
const AddTestimonialPage = React.lazy(() => import('./Pages/testimonial/AddTestimonialPage'))
const VideoPage = React.lazy(() => import('./Pages/video/VideoPage'))
const AddVideoPage = React.lazy(() => import('./Pages/video/AddVideoPage'))
const Subject = React.lazy(() => import('./Pages/subject/subject'))
const AddSubject = React.lazy(() => import('./Pages/subject/AddSubject'))
const AddQuestion = React.lazy(() => import('./Pages/AllQuestions/AddQuestion'))
const AddShiftQuestion = React.lazy(() => import('./Pages/AllQuestions/AddShiftQuestion'))
const Questions = React.lazy(() => import('./Pages/AllQuestions/Questions'))
const AddAdsBanner = React.lazy(() => import('./Pages/adsbanner/AddAdsBanner'))
const AdsBanner = React.lazy(() => import('./Pages/adsbanner/AdsBanner'))
const ContactUs = React.lazy(() => import('./Pages/contactus/ContactUs'))
const NewsEmailLetter = React.lazy(() => import('./Pages/newsemailletter/NewsEmailLetter'))
const ProductReview = React.lazy(() => import('./Pages/productreview/ProductReview'))
const Logo = React.lazy(() => import('./Pages/logo/Logo'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Products = React.lazy(() => import('./Pages/product/Products'))
const AddProduct = React.lazy(() => import('./Pages/product/AddProduct'))
const CategoryList = React.lazy(() => import('./Pages/category/CategoryList'))
const AddCategory = React.lazy(() => import('./Pages/category/AddCategory'))
const BulkCategoryUpload = React.lazy(() => import('./Pages/category/BulkCategoryUpload'))
const BulkSubCategoryUpload = React.lazy(() => import('./Pages/subcategory/BulkSubCategoryUpload'))
const BulkProductUpload = React.lazy(() => import('./Pages/product/BulkProductUpload'))
const SubCategoryList = React.lazy(() => import('./Pages/subcategory/SubcategoryList'))
const AddColorTheme = React.lazy(() => import('./Pages/colortheme/AddColorTheme'))
const ColorTheme = React.lazy(() => import('./Pages/colortheme/ColorTheme'))
const AddSubCategory = React.lazy(() => import('./Pages/subcategory/AddSubcategory'))
const FoodList = React.lazy(() => import('./Pages/FoodList'))
const AddFood = React.lazy(() => import('./Pages/AddFood'))
const AllUser = React.lazy(() => import('./Pages/user/AllUser'))
const AddUser = React.lazy(() => import('./Pages/user/AddUser'))
const Login = React.lazy(() => import('./Pages/Login'))

const App = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate(); // Use useNavigate here
  // const isAuthenticated = useSelector((state) => state.authenticated);

  // const checkAndRelogin = async () => {

  //   if (!isAuthenticated) {
  //     try {
  //       const response = await axios.get(`http://localhost:9000/api/check`, { withCredentials: true });
  //       const data = response.data;

  //       if (data) {
  //         dispatch({
  //           type: 'LOGIN',
  //           userId: data.user.id,
  //           email: data.user.email,
  //           name: data.user.name,
  //           role: data.user.role,
  //           profileImage: data.user.profileImageUrl,

  //         });
  //         navigate('/'); // Redirect to the homepage/dashboard
  //       }
  //     } catch (error) {
  //       navigate('/login')

  //       console.error('Re-login failed:', error);

  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkAndRelogin();
  // }, []);
  return (
    <Suspense
      fallback={
        <div
          className="pt-3 text-center w-100 d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Spinner color="warning" className="color"></Spinner>
        </div>
      }
    >
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
        <Route path="/unitlist" element={<ProtectedRoute><UnitList /></ProtectedRoute>} />
        <Route path="/addunit" element={<ProtectedRoute><AddUnit /></ProtectedRoute>} />
        <Route path="/alltopics" element={<ProtectedRoute><TopicLsit /></ProtectedRoute>} />
        <Route path="/addtopic" element={<ProtectedRoute><AddTopic /></ProtectedRoute>} />
        <Route path="/allcare" element={<ProtectedRoute><CareInstructionPageList /></ProtectedRoute>} />
        <Route path="/addcare" element={<ProtectedRoute><AddCareInstructionPage /></ProtectedRoute>} />
        <Route path="/alladditionalinfo" element={<ProtectedRoute><AdditionalInfoPageList /></ProtectedRoute>} />
        <Route path="/addadditionalinfo" element={<ProtectedRoute><AddAdditionalInfoPage /></ProtectedRoute>} />
        <Route path="/allchapter" element={<ProtectedRoute><TestimonialPage /></ProtectedRoute>} />
        <Route path="/addchapter" element={<ProtectedRoute><AddTestimonialPage /></ProtectedRoute>} />
        <Route path="/allquestions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
        <Route path="/addquestion" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
        <Route path="/addShiftQuestion" element={<ProtectedRoute><AddShiftQuestion /></ProtectedRoute>} />
        <Route path="/alladsbanner" element={<ProtectedRoute><AdsBanner /></ProtectedRoute>} />
        <Route path="/addadsbanner" element={<ProtectedRoute><AddAdsBanner /></ProtectedRoute>} />
        <Route path="/video" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
        <Route path="/addvideo" element={<ProtectedRoute><AddVideoPage /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/addproduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/categorylist" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/bulk-category-upload" element={<ProtectedRoute><BulkCategoryUpload /></ProtectedRoute>} />
        <Route path="/bulk-subcategory-upload" element={<ProtectedRoute><BulkSubCategoryUpload /></ProtectedRoute>} />
        <Route path="/bulk-product-upload" element={<ProtectedRoute><BulkProductUpload /></ProtectedRoute>} />
        <Route path="/subcategorylist" element={<ProtectedRoute><SubCategoryList /></ProtectedRoute>} />
        <Route path="/addsubcategory" element={<ProtectedRoute><AddSubCategory /></ProtectedRoute>} />
        <Route path="/addcategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path="/shift" element={<ProtectedRoute><Shifts /></ProtectedRoute>} />
        <Route path="/shift-subject" element={<ProtectedRoute><ShiftSubject /></ProtectedRoute>} />
        <Route path="/add-shift" element={<ProtectedRoute><AddShift /></ProtectedRoute>} />
        <Route path="/add-shift-subject" element={<ProtectedRoute><AddShiftSubject /></ProtectedRoute>} />
        <Route path="/years" element={<ProtectedRoute><NewsEmailLetter /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><ProductReview /></ProtectedRoute>} />
        <Route path="/logo" element={<ProtectedRoute><Logo /></ProtectedRoute>} />
        <Route path="/subject" element={<ProtectedRoute><Subject /></ProtectedRoute>} />
        <Route path="/addsubject" element={<ProtectedRoute><AddSubject /></ProtectedRoute>} />
        <Route path="/addcolortheme" element={<ProtectedRoute><AddColorTheme /></ProtectedRoute>} />
        <Route path="/colortheme" element={<ProtectedRoute><ColorTheme /></ProtectedRoute>} />
        <Route path="/foodlist" element={<ProtectedRoute><FoodList /></ProtectedRoute>} />
        <Route path="/addfood" element={<ProtectedRoute><AddFood /></ProtectedRoute>} />
        <Route path="/allusers" element={<ProtectedRoute><AllUser /></ProtectedRoute>} />
        <Route path="/adduser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
      </Routes>

      {/* <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/unitlist" element={<UnitList />} />
        <Route path="/addunit" element={<AddUnit />} />
        <Route path="/alltopics" element={<TopicLsit />} />
        <Route path="/addtopic" element={<AddTopic />} />
        <Route path="/allcare" element={<CareInstructionPageList />} />
        <Route path="/addcare" element={<AddCareInstructionPage />} />
        <Route path="/alladditionalinfo" element={<AdditionalInfoPageList />} />
        <Route path="/addadditionalinfo" element={<AddAdditionalInfoPage />} />
        <Route path="/allchapter" element={<TestimonialPage />} />
        <Route path="/addchapter" element={<AddTestimonialPage />} />
        <Route path="/allquestions" element={<Questions />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/alladsbanner" element={<AdsBanner />} />
        <Route path="/addadsbanner" element={<AddAdsBanner />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/addvideo" element={<AddVideoPage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/categorylist" element={<CategoryList />} />
        <Route path="/bulk-category-upload" element={<BulkCategoryUpload />} />
        <Route path="/bulk-subcategory-upload" element={<BulkSubCategoryUpload />} />
        <Route path="/bulk-product-upload" element={<BulkProductUpload />} />
        <Route path="/subcategorylist" element={<SubCategoryList />} />
        <Route path="/addsubcategory" element={<AddSubCategory />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/shift" element={<Shifts />} />
        <Route path="/shift-subject" element={<ShiftSubject />} />
        <Route path="/add-shift" element={<AddShift />} />
        <Route path="/add-shift-subject" element={<AddShiftSubject />} />
        <Route path="/news-email-letter" element={<NewsEmailLetter />} />
        <Route path="/product-review" element={<ProductReview />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/addsubject" element={<AddSubject />} />
        <Route path="/addcolortheme" element={<AddColorTheme />} />
        <Route path="/colortheme" element={<ColorTheme />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/allusers" element={<AllUser />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}

      <ToastContainer autoClose={1000} />
    </Suspense>
  )
}

export default App
