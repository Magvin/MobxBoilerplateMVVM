import { render } from "@testing-library/react"
import { AppProvider } from "./common/app/provider"
import React, { ReactElement } from "react"

export default function renderWithMobx({
  children,
  application,
}: {
  children: ReactElement
  application: Common.IApplication
}) {
  return render(<AppProvider application={application}>{children}</AppProvider>)
}
