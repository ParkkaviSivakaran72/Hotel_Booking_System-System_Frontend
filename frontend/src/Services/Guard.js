import {Navigate, useLocation} from "react-router-dom"
import React from "/react";
import APIService from "./APIService.js";
import { Component } from "react";

export const ProtectedRoute = ({element: Component}) => {
    const location = useLocation();
    return APIService.isAuthenticated() ? (
        Component
    ):
    (
        <Navigate to = "/login" replace state = {{from:location}} />

    )
}

export const AdminRoute = ({element: Component}) => {
    const location = useLocation();
    return APIService.isAdmin() ? (
        Component
    ):
    (
        <Navigate to = "/login" replace state = {{from: location}} />
    )
}