import * as React from "react";
import { useParams } from "react-router-dom";

interface WrappedComponentProps {
    id: any;
}

export function WithRouteId(Component: React.ComponentType<WrappedComponentProps>) {
    const { id } = useParams();

    return <Component id={id} />;
}
