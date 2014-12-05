package {{packageName}}.activity;

import android.app.Activity;
import android.content.Intent;
import android.view.Window;
import android.widget.ImageView;

import {{packageName}}.R;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.WindowFeature;

@EActivity(R.layout.{{layoutId}})
@WindowFeature({
  Window.FEATURE_NO_TITLE
})
public class {{activityName}} extends Activity {
  {{groups}}
  @ViewById(R.id.{{androidId}})
  ImageView {{androidSnakeCase}};
  {{/groups}}
  {{transitions}}
  @Click(R.id.{{from}})
  void {{fromSnakeCase}}Clicked() {
    startActivity(new Intent(this, {{to}}_.class));
  }
  {{/transitions}}
}
