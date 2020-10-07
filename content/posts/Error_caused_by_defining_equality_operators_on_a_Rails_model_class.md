---
title: "Error Caused by Defining Equality Operators on a Rails Model Class"
date: 2020-10-07T12:48:15-04:00
draft: true
tags: [rails, 'technical notes']
---

> _TLDR: Don't define equality operators like `==` or `!=` on your model classes._

I wanted to define an equality operator on an ActiveRecord model class like this:

``` 
  def ==(other)
    return false if self.harvest_year != other.harvest_year
    GOAL_TYPES.each do |kind|
      return false if self.get_goals(kind) != other.get_goals(kind)
    end
    true
  end
```

I used this method to check the equivalence of records based on only the attributes that I cared about. But I ran into a problem when testing the controller:

```
rails test test/controllers/production_plans_controller_test.rb:50 -b
Running via Spring preloader in process 3496
Run options: -b --seed 38775

# Running:

E

Error:
ProductionPlansControllerTest#test_should_destroy_production_plan:
NoMethodError: undefined method `harvest_year' for false:FalseClass
    /Users/brendan/code/piccolo/app/models/production_plan.rb:71:in `=='
    /usr/local/lib/ruby/gems/2.7.0/gems/activemodel-6.0.3.3/lib/active_model/callbacks.rb:148:in `!='
    /usr/local/lib/ruby/gems/2.7.0/gems/activemodel-6.0.3.3/lib/active_model/callbacks.rb:148:in `block (2 levels) in _define_after_model_callback'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:156:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:428:in `block in make_lambda'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:237:in `block (2 levels) in halting_and_conditional'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:237:in `all?'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:237:in `block in halting_and_conditional'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:517:in `block in invoke_after'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:517:in `each'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:517:in `invoke_after'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:136:in `run_callbacks'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:825:in `_run_destroy_callbacks'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/callbacks.rb:309:in `destroy'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/transactions.rb:310:in `block in destroy'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/transactions.rb:375:in `block in with_transaction_returning_status'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/connection_adapters/abstract/database_statements.rb:280:in `block in transaction'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/connection_adapters/abstract/transaction.rb:280:in `block in within_new_transaction'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/concurrency/load_interlock_aware_monitor.rb:26:in `block (2 levels) in synchronize'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/concurrency/load_interlock_aware_monitor.rb:25:in `handle_interrupt'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/concurrency/load_interlock_aware_monitor.rb:25:in `block in synchronize'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/concurrency/load_interlock_aware_monitor.rb:21:in `handle_interrupt'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/concurrency/load_interlock_aware_monitor.rb:21:in `synchronize'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/connection_adapters/abstract/transaction.rb:278:in `within_new_transaction'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/connection_adapters/abstract/database_statements.rb:280:in `transaction'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/transactions.rb:212:in `transaction'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/transactions.rb:366:in `with_transaction_returning_status'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/transactions.rb:310:in `destroy'
    /Users/brendan/code/piccolo/app/controllers/production_plans_controller.rb:51:in `destroy'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/basic_implicit_render.rb:6:in `send_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/abstract_controller/base.rb:195:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/rendering.rb:30:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/abstract_controller/callbacks.rb:42:in `block in process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:135:in `run_callbacks'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/abstract_controller/callbacks.rb:41:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/rescue.rb:22:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/instrumentation.rb:33:in `block in process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/notifications.rb:180:in `block in instrument'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/notifications/instrumenter.rb:24:in `instrument'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/notifications.rb:180:in `instrument'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/instrumentation.rb:32:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal/params_wrapper.rb:245:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/activerecord-6.0.3.3/lib/active_record/railties/controller_runtime.rb:27:in `process_action'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/abstract_controller/base.rb:136:in `process'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionview-6.0.3.3/lib/action_view/rendering.rb:39:in `process'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal.rb:190:in `dispatch'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_controller/metal.rb:254:in `dispatch'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/routing/route_set.rb:50:in `dispatch'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/routing/route_set.rb:33:in `serve'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/journey/router.rb:49:in `block in serve'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/journey/router.rb:32:in `each'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/journey/router.rb:32:in `serve'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/routing/route_set.rb:834:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/warden-1.2.9/lib/warden/manager.rb:36:in `block in call'
    /usr/local/lib/ruby/gems/2.7.0/gems/warden-1.2.9/lib/warden/manager.rb:34:in `catch'
    /usr/local/lib/ruby/gems/2.7.0/gems/warden-1.2.9/lib/warden/manager.rb:34:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/tempfile_reaper.rb:15:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/etag.rb:27:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/conditional_get.rb:40:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/head.rb:12:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/http/content_security_policy.rb:18:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/session/abstract/id.rb:266:in `context'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/session/abstract/id.rb:260:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/cookies.rb:648:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/callbacks.rb:27:in `block in call'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/callbacks.rb:101:in `run_callbacks'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/callbacks.rb:26:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/executor.rb:14:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/actionable_exceptions.rb:17:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/debug_exceptions.rb:32:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/show_exceptions.rb:33:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/railties-6.0.3.3/lib/rails/rack/logger.rb:37:in `call_app'
    /usr/local/lib/ruby/gems/2.7.0/gems/railties-6.0.3.3/lib/rails/rack/logger.rb:26:in `block in call'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/tagged_logging.rb:80:in `block in tagged'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/tagged_logging.rb:28:in `tagged'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/tagged_logging.rb:80:in `tagged'
    /usr/local/lib/ruby/gems/2.7.0/gems/railties-6.0.3.3/lib/rails/rack/logger.rb:26:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/remote_ip.rb:81:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/request_id.rb:27:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/method_override.rb:24:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/runtime.rb:22:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/cache/strategy/local_cache_middleware.rb:29:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/executor.rb:14:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/static.rb:126:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-2.2.3/lib/rack/sendfile.rb:110:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/middleware/host_authorization.rb:76:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/railties-6.0.3.3/lib/rails/engine.rb:527:in `call'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-test-1.1.0/lib/rack/mock_session.rb:29:in `request'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-test-1.1.0/lib/rack/test.rb:266:in `process_request'
    /usr/local/lib/ruby/gems/2.7.0/gems/rack-test-1.1.0/lib/rack/test.rb:119:in `request'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/testing/integration.rb:270:in `process'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/testing/integration.rb:42:in `delete'
    /usr/local/lib/ruby/gems/2.7.0/gems/actionpack-6.0.3.3/lib/action_dispatch/testing/integration.rb:361:in `block (2 levels) in <module:Runner>'
    /usr/local/lib/ruby/gems/2.7.0/gems/rails-controller-testing-1.0.5/lib/rails/controller/testing/integration.rb:16:in `block (2 levels) in <module:Integration>'
    /Users/brendan/code/piccolo/test/controllers/production_plans_controller_test.rb:52:in `block (2 levels) in <class:ProductionPlansControllerTest>'
    /usr/local/lib/ruby/gems/2.7.0/gems/activesupport-6.0.3.3/lib/active_support/testing/assertions.rb:98:in `assert_difference'
    /Users/brendan/code/piccolo/test/controllers/production_plans_controller_test.rb:51:in `block in <class:ProductionPlansControllerTest>'
```

Rails runs callbacks after deleting a record, and one of them invokes the comparison operator `!=`, which itself uses `==`.
Since I had overridden the `==` method on my model class, the callback threw an error.

```
# rails source for the callback: /activemodel-6.0.3.3/lib/active_model/callbacks.rb

 def _define_after_model_callback(klass, callback)
        klass.define_singleton_method("after_#{callback}") do |*args, **options, &block|
          options.assert_valid_keys(:if, :unless, :prepend)
          options[:prepend] = true
          conditional = ActiveSupport::Callbacks::Conditionals::Value.new { |v|
          # ⚠️ THAT'S YOUR PROBLEM RIGHT THERE ⚠️
            v != false
          }
          options[:if] = Array(options[:if]) << conditional
          set_callback(:"#{callback}", :after, *args, options, &block)
        end
      end
```

## The takeaway
Don't define the comparison operator on your model classes! I went back and renamed my method `equivalent_to(other)` instead of `==`.
