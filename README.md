# express-metrics

Provides a quick way to get metrics on a req after it has been sent. You can then push any metrics you desire.

```javascript
app.use(metrics(function(ms, status, req, res) {
  statsd.send("request.status", res.statusCode);
  statsd.send("request.duration", ms);
}));
```
