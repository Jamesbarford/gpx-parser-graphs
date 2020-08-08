import * as React from "react";
import { Card, CardContent, Container } from "@material-ui/core";

export const PageContainer: React.FC = props => (
    <Container style={{ marginTop: "30px" }} fixed>
        <Card>
            <CardContent>{props.children}</CardContent>
        </Card>
    </Container>
);
