import { useDispatch, useSelector } from "react-redux";
import {
  FieldTimeOutlined,
  PushpinOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Table } from "components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkModule } from "lib/checkModule";
import "./styles.scss";
import {
  getTicketsByAdminID,
  getTickets,
  getTicketsByDepartmentId,
} from "store";
// import { getUsers } from "store";
// import { getClients } from "store";
import { Button, message, Spin } from "antd";
import moment from "moment";
import { statusList } from "lib";
import { Navigation } from "./Details/sections";
import { useTranslation } from "react-i18next";
import { axios, getTicketsConfig, getTimeDiff, groupBy } from "lib";
import { useQuery } from "./Details/Details.section";
import { TicketSearch } from "modules/SupportTickets/pages/AdvancedSearch/AdvancedSearch";

export const RelatedList = ({ queueList, isSearch, AdvancedSearchOptions }) => {
  const { t } = useTranslation("/Tickets/ns");
  const location = useLocation();
  const { settings } = useSelector((state) => state.appSettings);
  const { allTickets, departmentTickets, loading, isSupport } = useSelector(
    (state) => state?.tickets
  );
  const userTickets = useSelector((state) => state?.tickets?.tickets);
  const { users } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const departmentsLoading = useSelector(
    (state) => state?.departments?.loading
  );
  const query = useQuery();
  const ticket_id = query.get("tid");
  const { deptId } = useParams();
  const tickets = location?.pathname?.includes("show-all")
    ? allTickets
    : location?.pathname.includes("by-department")
    ? departmentTickets
    : userTickets;

  const currentRoute = ({ deptId = "", id = "" }) =>
    location?.pathname?.includes("show-all")
      ? `/admin/dashboard/support/tickets/show-all/list/details/${id}?tid=${id}`
      : location?.pathname.includes("by-department")
      ? `/admin/dashboard/support/tickets/by-departments/${deptId}?tid=${id}`
      : `/admin/dashboard/support/tickets/list/details?tid=${id}`;

  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: "Support",
    modules: userModules,
  });

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (tickets?.length) {
      const dataToSet = (
        isSupport
          ? tickets?.filter((ticket) => ticket?.ticketStatus === 0)
          : tickets
      )?.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      const trueFirst = dataToSet
        ?.sort(
          (a, b) =>
            new Date(b?.lastModifiedOn).getTime() -
            new Date(a?.lastModifiedOn).getTime()
        )
        ?.sort((a, b) =>
          a?.pinTicket === b?.pinTicket ? 0 : a?.pinTicket ? -1 : 1
        );

      setData(trueFirst);
    }
  }, [tickets]);

  const navigate = useNavigate();

  const columns = [
    {
      title: "Ticket No.",
      dataIndex: "ticketNo",
      key: "ticketNo",
      sorter: (a, b) => (a?.ticketNo < b?.ticketNo ? -1 : 1),
    },
    {
      title: "Subject",
      dataIndex: "ticketTitle",
      key: "ticketTitle",
      sorter: (a, b) => (a?.ticketTitle < b?.ticketTitle ? -1 : 1),
    },
    {
      title: "Last Updated",
      dataIndex: "lastModifiedOn",
      key: "lastModifiedOn",
      render: (date) => (date ? getTimeDiff(date) : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusValue = statusList(status);
        return (
          <div
            className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}
          >
            {statusValue.name}
          </div>
        );
      },
    },
  ];
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      if (location?.pathname.includes("show-all")) {
        await dispatch(getTickets());
      } else if (location?.pathname?.includes("by-department")) {
        await dispatch(getTicketsByDepartmentId({ id: deptId }));
      } else {
        await dispatch(getTicketsByAdminID({ id: user?.id }));
      }
      // await dispatch(getUsers());
      // await dispatch(getClients());
    })();
  }, [dispatch, deptId]);

  useEffect(() => {
    (async () => {
      // await dispatch(getUsers());
      // await dispatch(getClients());
    })();
  }, []);

  // Selected Rows
  const [selectedRows, setSelectedRows] = useState(false);

  // Methods to Select Rows
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
  };
  const [values, setValues] = useState({
    ...AdvancedSearchOptions?.searchValues,
  });
  const [searchResults, setSearchResults] = useState("");

  let activeTicket = tickets ? groupBy(tickets, "ticketStatus") : {};

  useEffect(() => {
    (async () => {
      await dispatch(getTickets());
    })();
  }, [dispatch]);

  // const selectedTicket = tickets?.find(
  //   (ticket) => ticket?.id === ticket_id
  // )?.ticketStatus;
  const selectedTicket = isSupport ? 0 : tickets && tickets[0]?.ticketStatus;
  const [active, setActive] = useState(
    `${
      selectedTicket === 1
        ? t("waiting")
        : selectedTicket === 2
        ? t("closed")
        : t("active")
    }`
  );

  useEffect(() => {
    setActive(
      `${
        selectedTicket === 1
          ? t("waiting")
          : selectedTicket === 2
          ? t("closed")
          : t("active")
      }`
    );
    handleActive(
      active === "Active" ? 0 : active === "Waiting" ? 1 : 2,
      active
    );
  }, [allTickets]);

  const handleActive = (v, text) => {
    setActive(text);
    setData([]);
    if (tickets?.length) {
      const dataToSet = tickets
        ?.filter(function (el) {
          return el.ticketStatus === v;
        })
        .map((b) => {
          return {
            ...b,
            key: b?.id,
          };
        });
      setData(dataToSet);
    }
  };

  useEffect(() => {
    if (!isSearch && data?.length) {
      if (
        !isSearch &&
        location?.pathname?.includes("show-all") &&
        allTickets?.length > 0
      ) {
        navigate(
          `/admin/dashboard/support/tickets/show-all/list/details/${data[0]?.id}?tid=${data[0]?.id}`
        );
      } else if (
        !isSearch &&
        location?.pathname.includes("by-department") &&
        departmentTickets?.length > 0 &&
        !ticket_id
      ) {
        navigate(
          `/admin/dashboard/support/tickets/by-departments/${deptId}?tid=${data[0]?.id}`
        );
      }
      if (
        !isSearch &&
        userTickets?.length > 0 &&
        !location?.pathname?.includes("show-all") &&
        !location?.pathname.includes("by-department")
      ) {
        navigate(
          `/admin/dashboard/support/tickets/list/details?tid=${data[0]?.id}`
        );
      }
    } else if (!isSearch && data?.length < 1) {
      if (location?.pathname?.includes("show-all")) {
        navigate(`/admin/dashboard/support/tickets/show-all/list`);
      } else if (location?.pathname.includes("by-department")) {
        navigate(`/admin/dashboard/support/tickets/by-departments/${deptId}`);
      } else {
        navigate(`/admin/dashboard/support/tickets/list/details`);
      }
    }
  }, [data]);

  const links = [
    {
      label: t("active"),
      count:
        activeTicket && Object.keys(activeTicket)?.includes("0")
          ? activeTicket[0] && activeTicket[0]?.length
          : 0,
      showCount: true,
      onClick: () => handleActive(0, t("active")),
    },
    {
      label: t("waiting"),
      count:
        activeTicket && Object.keys(activeTicket)?.includes("1")
          ? activeTicket[1] && activeTicket[1].length
          : 0,
      showCount: true,
      onClick: () => handleActive(1, t("waiting")),
    },
    {
      label: t("closed"),
      count:
        activeTicket && Object.keys(activeTicket)?.includes("2")
          ? activeTicket[2] && activeTicket[2].length
          : 0,
      showCount: false,
      onClick: () => handleActive(2, t("closed")),
    },
  ];

  //Advanced Search
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const searchTicketHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const defaultData = {
      keyword: values?.title ? values?.title : null,
      pageNumber: 0,
      pageSize: values?.numResult ? parseInt(values?.numResult) : 3,
      orderBy: [""],
      ticketStatus: values.status ? parseInt(values.status) : null,
      assignedTo: values?.admin ? values?.admin : null,
      ticketNo: values?.ticketNo ? parseInt(values?.ticketNo) : null,
      ticketPriority: values.priority ? parseInt(values.priority) : null,
      clientEmail: values?.email ? values?.email : null,
      clientId: values?.client ? values?.client : null,
      createdOn: values?.dateAdded ? values?.dateAdded : null,
      departmentId: values?.department ? values?.department : null,
    };
    const { url } = getTicketsConfig();
    const res = await axios.post(url, defaultData);
    setIsLoading(false);
    if (res.status === 200) {
      setSearchResults(res?.data?.data?.length);
      setData(res?.data?.data);
    }
  };

  return (
    <>
      {!isSearch && <Navigation active={active} links={links} isAdmin />}
      <div className="p-[40px] pb-0 flex flex-col gap-[30px]">
      <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] mt-2`}>
        {isSearch && (
            <TicketSearch
              AdvancedSearchOptions={AdvancedSearchOptions}
              values={values}
              setValues={setValues}
              OnChange={inputChangeHandler}
              onSubmit={searchTicketHandler}
              isLoading={isLoading}
            />
          )}
      </div>

      </div>
      
      <div className="p-[40px] pt-0 flex flex-col gap-[30px]">
        <div className={`p-[40px] bg-[#1E1E2D] rounded-[8px] mt-2`}>
          {searchResults !== "" && (
            <div className="text-[#fff] text-md font-medium text-right">
              {searchResults === 0
                ? "No tickets found for your search queries"
                : `
            Total tickets matching search queries found : ${searchResults}`}
            </div>
          )}

          {isLoading || loading || departmentsLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Spin spinning={isLoading || loading || departmentsLoading} />
            </div>
          ) : (
            <div>
              <Table
                columns={columns}
                loading={isLoading || loading || departmentsLoading}
                data={data}
                fieldToFilter="id"
                permissions={permissions}
                rowClassName={(record) =>
                  record?.id === ticket_id ? "isActive" : ""
                }
                btnData={{
                  text: "Start Ticket",
                  onClick: () => {}
                }}
              />
            </div>
          )}
        </div>
      </div>
      
    </>
  );
};
