import React, { useEffect, useMemo, useRef, useState } from "react";
import Searchbar from "../components/shared/Searchbar";
import CourseCard from "../components/CourseCard";
import Modal from "../components/shared/Modal";
import CourseDetailCard from "../components/CourseDetailCard.jsx";
import CategorySections from "../components/CategorySections.jsx";
import NotFound from "../components/shared/NotFound.jsx";
import { api } from "../lib/api";

function normalizeCourse(course) {
  return {
    id: String(course.id),
    title: course.name,
    description: course.description,
    image: course.image,
    durationHours: course.duration,
    level: course.difficulty,
    rating: Number(course.rating ?? 0),
    students: course.enrollment_count ?? 0,
    price: Number(course.price ?? 0),
    updatedAt: course.created_at,
    category: course.category,
    instructor: course.instructor || "—",
   instructorAvatar:
      course.instructor_avatar ??
      course.instructorAvatar ??
      null,
  };
}

function getPillClasses(isActive) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 h-10 text-[14px] border transition-colors";
  if (isActive) {
    return [
      base,
      "bg-[#3b82f6] text-white border-[#3b82f6] dark:bg-[#3B82F6] dark:border-[#3B82F6]",
    ].join(" ");
  }
  return [
    base,
    "bg-white text-[#111827] border-slate-200 hover:border-blue-500 dark:bg-transparent dark:text-slate-200 dark:border-slate-700",
  ].join(" ");
}

function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]); 
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailErrorMessage, setDetailErrorMessage] = useState("");

  const searchDelayRef = useRef();

  function buildCoursesParams() {
    const params = {};
    const trimmed = searchText.trim();
    if (trimmed) params.search = trimmed;
    if (selectedCategory !== "All") params.category = selectedCategory;
    return params;
  }

  async function fetchCategoriesSummary() {
    try {
      const rows = await api.categoryStats();
      if (Array.isArray(rows)) {
        setCategories(rows);
        const total = rows.reduce((sum, row) => sum + (Number(row.count) || 0), 0);
        setTotalCoursesCount(total);
      } else {
        setCategories([]);
        setTotalCoursesCount(0);
      }
    } catch {
      setCategories([]);
      setTotalCoursesCount(0);
    }
  }

  async function fetchCourses() {
    setIsLoadingCourses(true);
    try {
      const data = await api.listCourses(buildCoursesParams());
      setCourses(Array.isArray(data) ? data.map(normalizeCourse) : []);
    } catch (error) {
      console.error(error);
      setCourses([]);
    } finally {
      setIsLoadingCourses(false);
    }
  }

  async function openCourseDetails(courseId) {
    setIsModalOpen(true);
    setSelectedCourse(null);
    setDetailErrorMessage("");
    setIsDetailLoading(true);

    try {
      const data = await api.courseById(courseId);
      setSelectedCourse(normalizeCourse(data));
    } catch (error) {
      console.error(error);
      setDetailErrorMessage("Failed to load course details.");
    } finally {
      setIsDetailLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoriesSummary();
  }, []);

  useEffect(() => {
    if (searchDelayRef.current) clearTimeout(searchDelayRef.current);
    searchDelayRef.current = setTimeout(fetchCourses, 300);
    return () => clearTimeout(searchDelayRef.current);
  }, [searchText, selectedCategory]);

 
  const coursesCountText = useMemo(() => {
    const n = courses.length;
    return `${n} ${n === 1 ? "course" : "courses"}`;
  }, [courses]);

  return (
    <div className="px-8 py-8 space-y-6">
      <Searchbar
        value={searchText}
        onChange={setSearchText}
        placeholder="Search courses..."
      />

      <div className="flex flex-wrap gap-2">
        <button
          className={getPillClasses(selectedCategory === "All")}
          onClick={() => setSelectedCategory("All")}
        >
          All{" "}
          <span className={selectedCategory === "All" ? "" : "text-[#111827] dark:text-slate-400"}>
            ({totalCoursesCount})
          </span>
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            className={getPillClasses(selectedCategory === category.name)}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}{" "}
            <span
              className={
                selectedCategory === category.name
                  ? "opacity-90"
                  : "text-[#111827] dark:text-slate-400"
              }
            >
              ({category.count})
            </span>
          </button>
        ))}
      </div>

      <CategorySections className="mt-4" />

      <div className="flex items-center justify-between pt-2">
        <h2 className="text-xl font-semibold">
          {selectedCategory === "All" ? "All Courses" : selectedCategory}
        </h2>
        <span className="text-sm opacity-70">{coursesCountText}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoadingCourses ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : courses.length === 0 ? (
          <div className="col-span-full">
            <NotFound message="No courses found" />
          </div>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onOpen={openCourseDetails}  
            />
          ))
        )}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isDetailLoading && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
            <p className="opacity-80">Loading course…</p>
          </div>
        )}

        {!isDetailLoading && detailErrorMessage && (
          <div className="p-6 text-center text-red-600">{detailErrorMessage}</div>
        )}

        {!isDetailLoading && selectedCourse && (
          <CourseDetailCard detail={selectedCourse} onClose={() => setIsModalOpen(false)} />
        )}
      </Modal>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-800/90 p-3">
      <p className="text-xs uppercase tracking-wide opacity-60">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 dark:border-slate-700/60 dark:bg-slate-800/70">
      <div className="h-44 w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default Home;
