import React, { useState, useEffect } from 'react';
import App from 'src/App';

import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import { IUser } from '../../models';
import { IPaths } from '../../constants';

import { RequireAuth } from './RequireAuth';
import LoginForm from '../Login/Login';
import RegistrationForm from '../Registration/Registration';
import { Courses, CreateCourse, CourseInfo } from '../../components';

export const RootComponent = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Routes>
			<Route path={IPaths.Home} element={<App />}>
				<Route path={IPaths.Login} element={<LoginForm />} />
				<Route path={IPaths.Registration} element={<RegistrationForm />} />
				<Route
					path={IPaths.Courses}
					element={
						<RequireAuth>
							<Courses />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.CoursesAdd}
					element={
						<RequireAuth>
							<CreateCourse />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.Course}
					element={
						<RequireAuth>
							<CourseInfo />
						</RequireAuth>
					}
				/>
				<Route
					path={IPaths.NotFound}
					element={
						<RequireAuth>
							<Navigate to={IPaths.Courses} />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
};
