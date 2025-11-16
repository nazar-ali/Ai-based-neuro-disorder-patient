export function allowRoles(roles) {
  return (handler) => {
    return async (req) => {
      const user = req.user; // added from auth middleware

      if (!roles.includes(user.role)) {
        return new Response("Access Denied", { status: 403 });
      }

      return handler(req);
    };
  };
}
