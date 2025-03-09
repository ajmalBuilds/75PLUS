import React, { useState, useEffect } from 'react';
import { GraduationCap, Percent, Calendar, Plus, Trash2, AlertCircle, CheckCircle, PieChart, MinusCircle, PlusCircle } from 'lucide-react';
import Progressbar from '../components/ProgressBar';

function Dashboard() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });
  const [requiredPercentage, setRequiredPercentage] = useState('75');
  const [newCourse, setNewCourse] = useState({
    id: '',
    courseId: '',
    attendedHours: 0,
    workingHours: 0,
    requiredPercentage: requiredPercentage,
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.courseId && newCourse.workingHours >= newCourse.attendedHours) {
      setCourses([...courses, { ...newCourse, id: Date.now().toString() }]);
      setNewCourse({
        id: '',
        courseId: '',
        attendedHours: 0,
        workingHours: 0,
        requiredPercentage: requiredPercentage,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);
  
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleNumberInput = (e, field) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value) || 0);
    setNewCourse({ ...newCourse, [field]: value });
  };

  const handleIncrement = (courseId, field) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            [field]: field === 'attendedHours' 
              ? Math.min(course.attendedHours + 1, course.workingHours) 
              : course.workingHours + 1
          };
        }
        return course;
      })
    );
  };
  
  const handleDecrement = (courseId, field) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            [field]: field === 'attendedHours' 
              ? Math.max(course.attendedHours - 1, 0) 
              : Math.max(course.workingHours - 1, course.attendedHours)
          };
        }
        return course;
      })
    );
  };
  

  const calculateAttendanceStats = (course) => {
    const currentPercentage = (course.attendedHours / course.workingHours) * 100;
    const requiredPercentageDecimal = course.requiredPercentage / 100;  
  
    if (currentPercentage >= course.requiredPercentage) {
      const classesCanBunk = Math.floor((course.attendedHours - requiredPercentageDecimal * course.workingHours) / requiredPercentageDecimal);
      return {
        currentPercentage,
        message: `You can bunk ${classesCanBunk} more ${classesCanBunk ==1 ? 'class' : 'classes'}`,
        status: 'good'
      };
    } else {
      const classesNeeded = Math.ceil((requiredPercentageDecimal * course.workingHours - course.attendedHours) / (1 - requiredPercentageDecimal));
      return {
        currentPercentage,
        message: `You need to attend ${classesNeeded} more ${classesNeeded ==1 ? 'class' : 'classes'}`,
        status: 'bad'
      };
    }
  };
  

  const calculateOverallStats = () => {
    const totalAttendedHours = courses.reduce((sum, course) => sum + course.attendedHours, 0);
    const totalWorkingHours = courses.reduce((sum, course) => sum + course.workingHours, 0);
    const overallPercentage = totalWorkingHours > 0 ? (totalAttendedHours / totalWorkingHours) * 100 : 0;
  
    let finalMessage;
    if (overallPercentage >= 75) {
      const classesCanBunk = Math.floor(totalAttendedHours / (requiredPercentage / 100) - totalWorkingHours);
      finalMessage = {
        message: `You can bunk ${classesCanBunk} more ${classesCanBunk ==1 ? 'class' : 'classes'}`,
        status: 'good',
      };
    } else {
      const classesNeeded = Math.ceil((requiredPercentage / 100 * (totalWorkingHours ) - totalAttendedHours) / (1 - (requiredPercentage / 100)));
      finalMessage = {
        message: `You need to attend ${classesNeeded.toFixed(0)} more ${classesNeeded ==1 ? 'class' : 'classes'}`,
        status: 'bad',
      };
    }
  
    return {
      totalAttendedHours,
      totalWorkingHours,
      overallPercentage,
      finalMessage,
    };
  };
  

  const overallStats = calculateOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="md:text-4xl text-2xl font-bold text-indigo-900 flex items-center justify-center gap-3">
            <GraduationCap className="w-10 h-10" />
            {/* <img src="src\assets\75Plus-logo.png" alt="" className='w-[190px] mix-blend-multiply ' /> */} Attendance Buddy
          </h1>
          <p className="text-indigo-600 mt-2">Attend Smart, Bunk Smarter!</p>
        </div>

        {courses.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Overall Statistics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-600 font-medium">Total Present Days</p>
                <p className="text-2xl font-bold text-indigo-900">{overallStats.totalAttendedHours}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-600 font-medium">Total Working Days</p>
                <p className="text-2xl font-bold text-indigo-900">{overallStats.totalWorkingHours}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-600 font-medium">Overall Attendance</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {overallStats.overallPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
            <div>
            <div className="mt-5 pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-indigo-600" />
                      <span className="text-lg font-semibold">
                        Current Attendance: {overallStats.overallPercentage.toFixed(1)}%
                      </span>
                    </div>

                    <Progressbar percentage={overallStats.overallPercentage.toFixed(1)} />
                    
                    <div className={`flex items-center gap-2 ${
                      overallStats.finalMessage.status === 'good' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {overallStats.finalMessage.status === 'good' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium">{overallStats.finalMessage.message}</span>
                    </div>
                  </div>
            </div>
          </div>
        )}

        <form onSubmit={handleAddCourse} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
              <input
                type="text"
                value={newCourse.courseId}
                onChange={(e) => setNewCourse({ ...newCourse, courseId: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                placeholder="CS101"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
              <input
                type="number"
                value={newCourse.attendedHours || ''}
                onChange={(e) => handleNumberInput(e, 'attendedHours')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
              <input
                type="number"
                value={newCourse.workingHours || ''}
                onChange={(e) => handleNumberInput(e, 'workingHours')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required %</label>
              <input
                type="number"
                value={newCourse.requiredPercentage || ''}
                onChange={(e) => {
                  handleNumberInput(e, 'requiredPercentage') 
                  setRequiredPercentage(e.target.value)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                max="100"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Course
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => {
            const stats = calculateAttendanceStats(course);
            return (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-800">{course.courseId}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Attended Hours:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(course.id, 'attendedHours')}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        type="button"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <span className="font-medium w-8 text-center">{course.attendedHours}</span>
                      <button
                        onClick={() => handleIncrement(course.id, 'attendedHours')}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        type="button"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Hours:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(course.id, 'workingHours')}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        type="button"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <span className="font-medium w-8 text-center">{course.workingHours}</span>
                      <button
                        onClick={() => handleIncrement(course.id, 'workingHours')}
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                        type="button"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Required Attendance:</span>
                    <span className="font-medium">{course.requiredPercentage}%</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-indigo-600" />
                      <span className="text-lg font-semibold">
                        Current Attendance: {stats.currentPercentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className={`flex items-center gap-2 ${
                      stats.status === 'good' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stats.status === 'good' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium">{stats.message}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Add your first course to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;